import { allPosts } from 'contentlayer/generated';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
export default function BlogPage() {
  const posts = allPosts;
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div>
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold lg:text-5xl tracking-tight text-black">
            Blog🚀
          </h1>
          <p className="text-muted-foreground text-xl">
            Next.jsとContentlayerを使用した、最新のブログ開発手法について解説します
          </p>
        </div>
      </div>
      <hr className="my-8" />
      <div className="grid sm:grid-cols-2 gap-10">
        {posts.map((post) => (
          <article key={post._id} className="relative flex flex-col space-y-2">
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={400}
                className="rounded-md border bg-muted"
              />
            )}
            <h2 className="text-2xl font-extrabold">{post.title}</h2>
            {post.description && (
              <p className="text-muted-foreground">{post.description}</p>
            )}
            {post.date && (
              <p className="text-sm text-muted-foreground font-medium">
                {format(new Date(post.date), 'yyyy-MM-dd')}
              </p>
            )}
            <Link href={post.slug} className="absolute inset-0"></Link>
          </article>
        ))}
      </div>
    </div>
  );
}
