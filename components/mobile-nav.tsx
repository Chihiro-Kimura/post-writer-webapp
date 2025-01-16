import { NavItem } from '@/types';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { useLockBodyScroll } from '@uidotdev/usehooks';

interface MobileNavProps {
  items: NavItem[];
}

export default function MobileNav({ items }: MobileNavProps) {
  useLockBodyScroll();

  return (
    <div className="fixed top-16 inset-0 z-50 p-6 shadow-md md:hidden animate-in slide-in-from-bottom-80">
      <div className="grid gap-6 bg-white p-4 text-popover-foreground shadow-md">
        <Link href="/" className="font-bold">
          {siteConfig.name}
        </Link>
        <nav className="text-sm flex gap-4">
          {items.map((item, index) => (
            <Link href={item.href} key={index}>
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
