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

    // 認証済みユーザーが認証ページにアクセスした場合
    if (isAuthPage && isAuth) {
      // シンプルにダッシュボードへリダイレクト
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // 未認証ユーザーが保護されたページにアクセスした場合
    if (!isAuthPage && !isAuth) {
      const loginUrl = new URL('/login', req.url);
      // 現在のパスが保護されたページの場合のみcallbackUrlを設定
      if (
        req.nextUrl.pathname.startsWith('/dashboard') ||
        req.nextUrl.pathname.startsWith('/editor')
      ) {
        loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      }
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized({ req, token }) {
        if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
          return validateBasicAuth(req.headers.get('Authorization'));
        }
        return true;
      },
    },
  }
);
