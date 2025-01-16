import { Post } from '@prisma/client';
import Link from 'next/link';
import { format } from 'date-fns';
import PostActions from './post-actions';

interface PostItemProps {
  post: Pick<Post, 'id' | 'title' | 'published' | 'createdAt'>;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="grid gap-1">
        <Link href={`/editor/${post.id}`} className="hover:underline">
          {post.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {format(post.createdAt, 'yyyy/MM/dd')}
          </p>
        </div>
      </div>
      <PostActions post={post} />
    </div>
  );
}
