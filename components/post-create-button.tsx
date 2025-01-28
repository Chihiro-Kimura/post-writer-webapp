'use client';

import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Icons } from '@/components/icon';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

interface PostCreateButtonProps extends ButtonProps {}

export function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const handleClick = async () => {
    setIsLoading(true);
    const credentials = btoa(
      `${process.env.NEXT_PUBLIC_BASIC_USERNAME}:${process.env.NEXT_PUBLIC_BASIC_PASSWORD}`
    );
    console.log('Credentials:', credentials);
    console.log(
      'Is Preview:',
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    );

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({
        title: '新しい記事',
        content: '',
      }),
      credentials: 'include',
    });
    setIsLoading(false);
    if (response.ok) {
      const post = await response.json();
      router.push(`/editor/${post.id}`);
    } else {
      toast({
        title: '記事の作成に失敗しました',
        description: 'もう一度お試しください',
        variant: 'destructive',
      });
    }
  };

  return (
    <button
      className={cn(
        buttonVariants({ variant }),
        { 'cursor-not-allowed opacity-50': isLoading },
        className
      )}
      onClick={handleClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="w-4 h-4 animate-spin" />
      ) : (
        <Icons.add className="w-4 h-4" />
      )}
      新しい記事を作成
    </button>
  );
}
