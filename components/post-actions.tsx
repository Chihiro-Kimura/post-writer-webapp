'use client';

import { type Post } from '.prisma/client';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { Icons } from './icon';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostActionsProps {
  post: Pick<Post, 'id' | 'title'>;
}

const deletePost = async (postId: string) => {
  try {
    await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
    toast({
      title: '削除に成功しました',
      description: '投稿が削除されました',
      variant: 'default',
    });
  } catch (error) {
    toast({
      title: '削除に失敗しました',
      description: 'もう一度お試しください',
      variant: 'destructive',
    });
  }
};

export default function PostActions({ post }: PostActionsProps) {
  const router = useRouter();
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const handleDeletePost = async () => {
    setIsDeleteLoading(true);
    await deletePost(post.id);
    setDeleteDialogOpen(false);
    router.refresh();
    setIsDeleteLoading(false);
  };

  return (
    <div>
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
          <DropdownMenuItem
            className="text-destructive cursor-pointer focus:text-destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消せません。これにより、投稿が完全に削除されます。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={async (e) => {
                e.preventDefault();
                await handleDeletePost();
              }}
              disabled={isDeleteLoading}
            >
              {isDeleteLoading ? (
                <Icons.spinner className="w-4 h-4 animate-spin" />
              ) : (
                <Icons.trash className="w-4 h-4" />
              )}
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
