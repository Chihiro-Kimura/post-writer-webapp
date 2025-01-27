import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from './db';

export const authOptions: NextAuthOptions = {
  // 認証プロバイダーの設定
  providers: [
    // GitHub認証の設定
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    // Google認証の設定
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  // Prismaアダプターの設定（データベース連携用）
  adapter: PrismaAdapter(db),
  // カスタムページの設定
  pages: {
    signIn: '/login', // ログインページのカスタムパス
  },
  // Cookie設定を追加
  cookies: {
    state: {
      name: 'next-auth.state',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    // JWTトークン生成時のコールバック
    async jwt({ token, user }) {
      if (user) {
        // ユーザー情報がある場合、トークンにユーザーIDを追加
        return { ...token, id: user.id };
      }
      return token;
    },
    // セッション処理時のコールバック
    async session({ session, token }) {
      if (token) {
        // トークンの情報をセッションのユーザー情報に反映
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  // セッション管理の設定
  session: {
    strategy: 'jwt', // JWTベースのセッション管理を使用
  },
};
