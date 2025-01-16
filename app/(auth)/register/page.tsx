import Link from 'next/link';
import UserAuthForm from '@/components/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Register() {
  return (
    <div className="container grid flex-col lg:grid-cols-2 h-screen w-screen items-center justify-center lg:max-w-none lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 md:left-8 md:top-8'
        )}
      >
        アカウントの作成
      </Link>
      <div className="h-full bg-muted hidden lg:block" />
      <div className="mx-auto flex flex-col items-center justify-center space-y-6 w-full max-w-md sm:w-[350px]">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">ログイン</h1>
          <p className="text-sm text-muted-foreground">
            メールアドレスとパスワードを入力してアカウントを作成してください。
          </p>
        </div>
        <UserAuthForm />
        <p className="text-sm text-muted-foreground px-8 text-center">
          続行することで、
          <Link href="/terms" className="underline underline-offset-4">
            利用規約
          </Link>
          および
          <Link href="/privacy" className="underline underline-offset-4">
            プライバシーポリシー
          </Link>
          に同意したものとみなされます。
        </p>
      </div>
    </div>
  );
}
