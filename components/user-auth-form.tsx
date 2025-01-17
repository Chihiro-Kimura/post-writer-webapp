'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Icons } from '@/components/icon';

export default function UserAuthForm() {
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  return (
    <div className="grid gap-6">
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" type="email" placeholder="example@example.com" />
          </div>
          <Button className={cn(buttonVariants())} type="submit">
            メールアドレスでログイン
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground">
            または
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => {
            setIsGithubLoading(true);
            signIn('github', { callbackUrl: '/dashboard' });
          }}
          className={cn(buttonVariants({ variant: 'outline' }), 'text-black')}
        >
          {isGithubLoading ? (
            <Icons.spinner className="mr-2 animate-spin" />
          ) : (
            <Icons.github className="mr-2" />
          )}
          GitHubでログイン
        </Button>

        <Button
          onClick={() => {
            setIsGoogleLoading(true);
            signIn('google', { callbackUrl: '/dashboard' });
          }}
          className={cn(buttonVariants({ variant: 'outline' }), 'text-black')}
        >
          {isGoogleLoading ? (
            <Icons.spinner className="mr-2 animate-spin" />
          ) : (
            <Icons.google className="mr-2" />
          )}
          Googleでログイン
        </Button>
      </div>
    </div>
  );
}
