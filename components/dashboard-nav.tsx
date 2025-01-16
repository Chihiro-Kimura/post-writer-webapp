'use client';

import { SidebarNavItem } from '@/types';
import Link from 'next/link';
import { Icons } from '@/components/icon';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export const DashboardNav: React.FC<DashboardNavProps> = ({ items }) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  if (!items) return null;

  return (
    <nav>
      {items.map((item, index) => {
        const Icon = Icons[item.icon as keyof typeof Icons] || Icons.arrowRight;
        return (
          <Link key={index} href={item.disabled ? '' : item.href ?? ''}>
            <span
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-accent-foreground hover:bg-accent transition-colors duration-200',
                isActive(item.href ?? '') && 'bg-accent'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.title}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
