import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/editor/:path*',
    '/login',
    '/register',
    // プレビュー環境用のパスを追加
    ...(process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? ['/:path*', '/index/:path*']
      : []),
  ],
};

// Basic認証の検証を行うヘルパー関数を追加
const validateBasicAuth = (authHeader: string | null): boolean => {
  if (!authHeader) return false;

  const authValue = authHeader.split(' ')[1];
  const [user, password] = atob(authValue).split(':');

  return (
    user === process.env.BASIC_USERNAME &&
    password === process.env.BASIC_PASSWORD
  );
};

// previewConfigを削除し、単一のmiddleware関数に統合
export default withAuth(
  async function middleware(req) {
    // デバッグ用のログ出力
    console.log('Middleware Path:', req.nextUrl.pathname);
    console.log(
      'Is Preview:',
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    );

    // プレビュー環境での Basic 認証チェック
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
      const isValidBasicAuth = validateBasicAuth(
        req.headers.get('Authorization')
      );

      if (!isValidBasicAuth) {
        return NextResponse.json(
          { error: 'Authentication required' },
          {
            headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
            status: 401,
          }
        );
      }
    }

    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/register');

    console.log('Auth Status:', { isAuth, isAuthPage });

    // 認証ページへのアクセスを処理
    if (isAuthPage) {
      if (isAuth) {
        console.log(
          'Authenticated user accessing auth page - redirecting to dashboard'
        );
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      console.log('Unauthenticated user accessing auth page - allowing access');
      return NextResponse.next();
    }

    // 保護されたページへのアクセスを処理
    const isProtectedPage =
      req.nextUrl.pathname.startsWith('/dashboard') ||
      req.nextUrl.pathname.startsWith('/editor');

    if (isProtectedPage) {
      if (!isAuth) {
        console.log(
          'Unauthenticated user accessing protected page - redirecting to login'
        );
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
      }
      console.log(
        'Authenticated user accessing protected page - allowing access'
      );
      return NextResponse.next();
    }

    // その他のページは通常通り処理
    console.log('Accessing public page - allowing access');
    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized({ req, token }) {
        // Basic認証のチェックのみを行う
        if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
          return validateBasicAuth(req.headers.get('Authorization'));
        }
        return true;
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);
