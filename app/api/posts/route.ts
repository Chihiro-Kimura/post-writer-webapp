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

export async function POST(req: NextRequest) {
  try {
    // 認証セッションの取得
    const session = await getServerSession(authOptions);

    // 未認証の場合は403エラーを返す
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
