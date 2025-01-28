import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

// 投稿データのバリデーションスキーマ
const postSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

// Basic認証の検証関数
const validateBasicAuth = (req: NextRequest): boolean => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return false;

  const authValue = authHeader.split(' ')[1];
  const [user, password] = atob(authValue).split(':');

  return (
    user === process.env.BASIC_USERNAME &&
    password === process.env.BASIC_PASSWORD
  );
};

export async function POST(req: NextRequest) {
  try {
    // プレビュー環境の場合はBasic認証を確認
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
      if (!validateBasicAuth(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      // プレビュー環境用のユーザーID
      const previewUserId = 'preview-admin';
      const { title, content } = await req.json();
      const parsed = postSchema.parse({ title, content });

      const post = await db.post.create({
        data: {
          title: parsed.title,
          content: parsed.content,
          authorId: previewUserId,
        },
        select: {
          id: true,
        },
      });

      return NextResponse.json(post);
    }

    // 通常環境での処理
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { user } = session;

    // リクエストボディからデータを取得
    const { title, content } = await req.json();

    // Zodを使用してデータのバリデーション
    const parsed = postSchema.parse({ title, content });

    // データベースに新しい投稿を作成
    const post = await db.post.create({
      data: {
        title: parsed.title,
        content: parsed.content,
        authorId: user.id,
      },
      select: {
        id: true,
      },
    });

    // 作成された投稿のIDを返す
    return NextResponse.json(post);
  } catch (error) {
    // バリデーションエラーの場合は422エラーを返す
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 422 });
    }
    // その他のエラーは500エラーを返す
    return NextResponse.json(null, { status: 500 });
  }
}
