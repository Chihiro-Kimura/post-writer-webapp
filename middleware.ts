import { getToken } from 'next-auth/jwt';
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

// Basic認証の検証関数を修正
const validateBasicAuth = (authHeader: string | null): boolean => {
  if (!authHeader) {
    console.log('No auth header'); // デバッグ用
    return false;
  }

  try {
    const authValue = authHeader.split(' ')[1];
    const [user, password] = atob(authValue).split(':');

    console.log('Auth check:', {
      // デバッグ用
      user,
      expected: process.env.BASIC_USERNAME,
      matches: user === process.env.BASIC_USERNAME,
    });

    return (
      user === process.env.BASIC_USERNAME &&
      password === process.env.BASIC_PASSWORD
    );
  } catch (error) {
    console.error('Auth validation error:', error); // デバッグ用
    return false;
  }
};

// withAuthを使用せずに、独自のミドルウェアを実装
export default async function middleware(req: NextRequest) {
  console.log('Middleware Path:', req.nextUrl.pathname);
  console.log('Is Preview:', process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview');

  // プレビュー環境での処理
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
    const authHeader = req.headers.get('Authorization');

    // APIエンドポイントへのリクエストの場合は、Basic認証をチェックして次に進む
    if (req.nextUrl.pathname.startsWith('/api/')) {
      if (validateBasicAuth(authHeader)) {
        return NextResponse.next();
      }
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // API以外のページアクセスの場合は、Basic認証をチェック
    if (validateBasicAuth(authHeader)) {
      return NextResponse.next();
    }

    // Basic認証が通っていない場合、Basic認証を要求
    return new NextResponse(null, {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  // プレビュー環境以外は通常の認証フロー
  const token = await getToken({ req });
  const isAuth = !!token;
  const isAuthPage =
    req.nextUrl.pathname.startsWith('/login') ||
    req.nextUrl.pathname.startsWith('/register');

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  const isProtectedPage =
    req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/editor');

  if (isProtectedPage && !isAuth) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
