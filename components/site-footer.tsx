import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function SiteFooter() {
  return (
    <footer>
      <div className="container py-10 md:py-0 md:h-20">
        <p className="text-center text-sm md:text-left">
          Built by{' '}
          <Link
            href={siteConfig.links.X}
            className="underline underline-offset-4 font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            C.Kimura
          </Link>
          .Hosted on{' '}
          <Link
            href="https://vercel.com"
            className="underline underline-offset-4 font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel
          </Link>
        </p>
      </div>
    </footer>
  );
}
