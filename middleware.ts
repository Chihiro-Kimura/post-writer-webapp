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

// previewConfigを削除し、単一のmiddleware関数に統合
export default withAuth(
  async function middleware(req) {
    // プレビュー環境での Basic 認証チェック
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
      const basicAuth = req.headers.get('Authorization');
      if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        const [user, password] = atob(authValue).split(':');

        if (
          user !== process.env.BASIC_USERNAME ||
          password !== process.env.BASIC_PASSWORD
        ) {
          return NextResponse.json(
            { error: 'Invalid credentials' },
            {
              headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
              status: 401,
            }
          );
        }
      } else {
        return NextResponse.json(
          { error: 'Please enter credentials' },
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

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      return null;
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  },
  {
    callbacks: {
      async authorized({ req, token }) {
        return true;
      },
    },
  }
);
