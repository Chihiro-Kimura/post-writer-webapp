import { allPosts } from '@/.contentlayer/generated';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Mdx from '@/components/mdx-components';
import { siteConfig } from '@/config/site';

async function getPostFromSlug(slug: string) {
  const post = allPosts.find((post) => post.slugAsParams === slug);
  return post;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const page = await getPostFromSlug(params.slug);
  if (!page) {
    return {};
  }
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      type: 'article',
      locale: 'ja_JP',
      url: siteConfig.url,
      title: page.title,
      description: page.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: '@kimura_chihiro',
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostFromSlug(params.slug);

  if (!post) {
    notFound();
  }
  return (
    <article className="container max-w-3xl py-6 lg:py-10">
      <div>
        {post.date && (
          <time dateTime={post.date}>
            published on {format(post.date, 'yyyy-MM-dd')}
          </time>
        )}
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight lg:text-5xl leading-tight">
          {post.title}
        </h1>
      </div>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={400}
          className="rounded-md my-8 border bg-muted"
        />
      )}
      <Mdx code={post.body.code} />
      <hr className="mt-12" />
      <div className="py-6 text-center lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: 'ghost' }))}>
          ← すべての記事
        </Link>
      </div>
    </article>
  );
}
