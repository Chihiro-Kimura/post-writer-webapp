import DashBoardShell from '@/components/dashboard-shell';
import { DashBoardHeader } from '@/components/dashboard-header';
import { PostCreateButton } from '@/components/post-create-button';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import PostItem from '@/components/post-item';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const posts = await db.post.findMany({
    where: {
      authorId: user?.id,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <DashBoardShell>
      <DashBoardHeader heading="記事投稿" text="記事の作成と管理">
        <PostCreateButton />
      </DashBoardHeader>
      <div>
        {posts.length === 0 ? (
          <div className="text-muted-foreground">記事がありません</div>
        ) : (
          <div className="divide-y border rounded-md">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </DashBoardShell>
  );
}
