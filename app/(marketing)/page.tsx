import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

export default function IndexPage() {
  return (
    <>
      {/* ヒーローセクション */}
      <section className="pt-6 md:pt-10 lg:py-32 pb-8 md:pb-12">
        <div className="container text-center flex flex-col items-center gap-4 max-w-[64rem]">
          <Link
            href={siteConfig.links.X}
            className="bg-muted px-4 py-1.5 rounded-2xl font-medium text-sm"
          >
            Xをフォローする
          </Link>
          <h1 className="text-3xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
            Post Writer
          </h1>
          <p className="text-muted-foreground sm:text-xl leading-normal max-w-[42rem]">
            このアプリはNext.js App
            Routerで作成されており、ユーザーが自由に投稿を作成して共有できるようになっています。
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: 'lg' }))}>
              はじめる
            </Link>
            <Link
              href={siteConfig.links.Github}
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </Link>
          </div>
        </div>
      </section>

      {/* 機能紹介セクション */}
      <section
        id="features"
        className="container py-8 md:pb-12 lg:py-24 bg-slate-50 space-y-6"
      >
        {/* 機能紹介ヘッダー */}
        <div className="text-center space-y-6 max-w-[58rem] mx-auto">
          <h2 className="text-3xl font-extrabold md:text-6xl">
            最先端で手軽な投稿を
          </h2>
          <p className="text-muted-foreground sm:text-lg sm:leading-7">
            このプロジェクトは、モダンな技術スタックを活用したWebアプリです。Next.jsのApp
            RouterやContentlayerを組み合わせることで、マークダウン形式でブログ投稿が可能になっています。
          </p>
        </div>

        {/* 機能カードグリッド */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-[64rem]">
          {/* Next.js 13 */}
          <div className="bg-background border p-2 rounded-lg">
            <div className="flex flex-col justify-between p-6 h-[220px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] lg:w-[75px] lg:h-[75px]"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M386.399 35.508C217.06-64.061 1.885 57.55.012 253.882c-1.828 191.716 201.063 315.545 370.02 231.163L185.56 213.636v167.997c0 18.614-35.619 18.614-35.619 0V156.421c0-14.776 27.448-15.989 35.226-3.145L395.43 470.572c157.95-101.737 155.817-338.136-9.031-435.064zm-23.756 317.939L326.91 298.87V149.458c0-13.932 35.732-13.932 35.732 0v203.989z"
                />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Next.js</h3>
                <p className="text-muted-foreground text-sm">
                  TypeScript + App Router + Server Components
                </p>
              </div>
            </div>
          </div>

          {/* React 18 */}
          <div className="bg-background border p-2 rounded-lg">
            <div className="flex flex-col justify-between p-6 h-[220px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] lg:w-[75px] lg:h-[75px]"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236a2.236 2.236 0 0 1-2.236-2.236a2.236 2.236 0 0 1 2.235-2.236a2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622c-1.78-1.653-3.542-2.602-4.887-2.602c-.41 0-.783.093-1.106.278c-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03c-.704 3.113-.39 5.588.988 6.38c.32.187.69.275 1.102.275c1.345 0 3.107-.96 4.888-2.624c1.78 1.654 3.542 2.603 4.887 2.603c.41 0 .783-.09 1.106-.275c1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032c.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127c.666.382.955 1.835.73 3.704c-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28c-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538a15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707c.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564c-.44-.02-.89-.034-1.345-.034c-.46 0-.915.01-1.36.034c.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093c.406.582.802 1.203 1.183 1.86c.372.64.71 1.29 1.018 1.946c-.308.655-.646 1.31-1.013 1.95c-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005a26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16c-.225.39-.435.782-.635 1.174c-.265-.656-.49-1.31-.676-1.947c.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387c-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498c1.732.74 2.852 1.708 2.852 2.476c-.005.768-1.125 1.74-2.857 2.475c-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5c-1.732-.737-2.852-1.706-2.852-2.474c0-.768 1.12-1.742 2.852-2.476c.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948c-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175c.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423c.23 1.868-.054 3.32-.714 3.708c-.147.09-.338.128-.563.128c-1.012 0-2.514-.807-4.11-2.28c.686-.72 1.37-1.536 2.02-2.44c1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532c.66.905 1.345 1.727 2.035 2.446c-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703c.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034c.46 0 .915-.01 1.36-.034c-.44.572-.895 1.095-1.345 1.565c-.455-.47-.91-.993-1.36-1.565z"
                />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">React 18</h3>
                <p className="text-muted-foreground text-sm">
                  React Hook Form + Zod + EditorJS
                </p>
              </div>
            </div>
          </div>

          {/* データベース */}
          <div className="bg-background border p-2 rounded-lg">
            <div className="flex flex-col justify-between p-6 h-[220px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] lg:w-[75px] lg:h-[75px]"
                viewBox="0 0 256 310"
              >
                <path d="M254.313 235.519L148 9.749A17.063 17.063 0 0 0 133.473.037a16.87 16.87 0 0 0-15.533 8.052L2.633 194.848a17.465 17.465 0 0 0 .193 18.747L59.2 300.896a18.13 18.13 0 0 0 20.363 7.489l163.599-48.392a17.929 17.929 0 0 0 11.26-9.722a17.542 17.542 0 0 0-.101-14.76l-.008.008Zm-23.802 9.683l-138.823 41.05c-4.235 1.26-8.3-2.411-7.419-6.685l49.598-237.484c.927-4.443 7.063-5.147 9.003-1.035l91.814 194.973a6.63 6.63 0 0 1-4.18 9.18h.007Z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">データベース</h3>
                <p className="text-muted-foreground text-sm">
                  Prisma + PostgreSQL + Supabase
                </p>
              </div>
            </div>
          </div>

          {/* サブスクリプション */}
          <div className="bg-background border p-2 rounded-lg">
            <div className="flex flex-col justify-between p-6 h-[220px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] lg:w-[75px] lg:h-[75px]"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409c0-.831.683-1.305 1.901-1.305c2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0C9.667 0 7.589.654 6.104 1.872C4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219c2.585.92 3.445 1.574 3.445 2.583c0 .98-.84 1.545-2.354 1.545c-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813c1.664-1.305 2.525-3.236 2.525-5.732c0-4.128-2.524-5.851-6.594-7.305h.003z"
                />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">決済システム</h3>
                <p className="text-muted-foreground text-sm">
                  Stripe API + Webhookで決済処理
                </p>
              </div>
            </div>
          </div>

          {/* 認証 */}
          <div className="bg-background border p-2 rounded-lg">
            <div className="flex flex-col justify-between p-6 h-[220px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] lg:w-[75px] lg:h-[75px]"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M24 43.5c1.69 0 15.25-7.77 15.25-16.94v-20c-4 0-15.25-2-15.25-2s-11.26 2-15.25 2v20C8.75 35.73 22.31 43.5 24 43.5Z"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M27.39 18.9a3.39 3.39 0 1 0-6.78 0a3.33 3.33 0 0 0 2.07 3.1v3.13a1.32 1.32 0 0 0 2.64 0V22a3.39 3.39 0 0 0 2.07-3.1Z"
                />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">NextAuth.js</h3>
                <p className="text-muted-foreground text-sm">
                  OAuth + JWT + Prisma Adapter
                </p>
              </div>
            </div>
          </div>

          {/* コンポーネント */}
          <div className="bg-background border p-2 rounded-lg">
            <div className="flex flex-col justify-between p-6 h-[220px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] lg:w-[75px] lg:h-[75px]"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M128 204.667C145.062 136.227 187.738 102 256 102c102.4 0 115.2 77 166.4 89.833c34.138 8.56 64-4.273 89.6-38.5C494.938 221.773 452.262 256 384 256c-102.4 0-115.2-77-166.4-89.833c-34.138-8.56-64 4.273-89.6 38.5zm-128 154C17.062 290.227 59.738 256 128 256c102.4 0 115.2 77 166.4 89.833c34.138 8.56 64-4.273 89.6-38.5C366.938 375.773 324.262 410 256 410c-102.4 0-115.2-77-166.4-89.833c-34.138-8.56-64 4.273-89.6 38.5z"
                />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">モダンUI</h3>
                <p className="text-muted-foreground text-sm">
                  Tailwind CSS + shadcn/ui + Radix UI
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 機能紹介フッター */}
        <div className="mx-auto md:max-w-[58rem] text-center">
          <p className="text-muted-foreground sm:text-lg sm:leading-7">
            Post Writerはログインするとブログ投稿ができるようになります。
          </p>
        </div>
      </section>

      {/* お問い合わせセクション */}
      <section id="contact" className="container py-8 md:py-12 lg:py-24">
        <div className="text-center flex flex-col items-center gap-4 max-w-[58rem] mx-auto">
          <h2 className="text-3xl font-extrabold md:text-6xl">お問い合わせ</h2>
          <p className="text-muted-foreground sm:text-lg sm:leading-7">
            お問い合わせはXでお願いします。
          </p>
          <Link
            href={siteConfig.links.X}
            className="underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Xをフォローする
          </Link>
        </div>
      </section>
    </>
  );
}
