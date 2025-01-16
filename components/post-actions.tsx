import { Post } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from './ui/dropdown-menu';

import Link from 'next/link';
import { Icons } from './icon';

interface PostActionsProps {
  post: Pick<Post, 'id' | 'title'>;
}

export default function PostActions({ post }: PostActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icons.ellipsis className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`/editor/${post.id}`} className="w-full">
            編集
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive cursor-pointer focus:text-destructive">
          削除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
