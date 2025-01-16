import Editor from '@/components/editor';
import { db } from '@/lib/db';
import { Post, User } from '@prisma/client';
import { getCurrentUser } from '@/lib/session';
import { redirect, notFound } from 'next/navigation';

interface EditorProps {
  params: { postid: string };
}

async function getPostForUser(postid: Post['id'], userId: User['id']) {
  const post = await db.post.findFirst({
    where: { id: postid, authorId: userId },
  });
  return post;
}

export default async function EditorPage({ params }: EditorProps) {
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/login');
  }
  const userId = user.id;

  const postid = params.postid;
  const post = await getPostForUser(postid, userId);

  if (!post) {
    notFound();
  }

  return (
    <Editor
      post={{
        id: post?.id,
        title: post?.title,
        content: post?.content,
        published: post?.published,
      }}
    />
  );
}
