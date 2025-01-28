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

    // callbackUrlの処理を改善
    const url = new URL(req.url);
    const callbackUrl = url.searchParams.get('callbackUrl');

    // 認証済みユーザーが認証ページにアクセスした場合
    if (isAuthPage && isAuth) {
      // callbackUrlが存在する場合はそちらにリダイレクト
      if (
        callbackUrl &&
        !callbackUrl.includes('/login') &&
        !callbackUrl.includes('/register')
      ) {
        return NextResponse.redirect(new URL(callbackUrl, req.url));
      }
      // callbackUrlがない場合はダッシュボードへ
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // 未認証ユーザーが保護されたページにアクセスした場合
    if (!isAuthPage && !isAuth) {
      const loginUrl = new URL('/login', req.url);
      // 現在のURLをcallbackUrlとして設定（認証ページは除外）
      if (
        !req.nextUrl.pathname.startsWith('/login') &&
        !req.nextUrl.pathname.startsWith('/register')
      ) {
        loginUrl.searchParams.set('callbackUrl', req.url);
      }
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized({ req, token }) {
        // プレビュー環境でBasic認証がある場合は常に許可
        if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
          return validateBasicAuth(req.headers.get('Authorization'));
        }
        return true;
      },
    },
  }
);
