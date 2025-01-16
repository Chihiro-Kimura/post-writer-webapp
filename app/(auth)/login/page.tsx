import Link from 'next/link';
import UserAuthForm from '@/components/user-auth-form';

export default function Login() {
  return (
    <div className="container flex flex-col items-center justify-center h-screen w-screen">
      <div className="mx-auto flex flex-col items-center justify-center space-y-6 w-full max-w-md sm:w-[350px]">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">ログイン</h1>
          <p className="text-sm text-muted-foreground">
            メールアドレスとパスワードを入力してログインしてください。
          </p>
        </div>
        <UserAuthForm />
        <p className="text-sm text-muted-foreground px-8 text-center">
          <Link href="/register">新規登録</Link>
        </p>
      </div>
    </div>
  );
}
