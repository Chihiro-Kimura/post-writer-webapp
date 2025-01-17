import MainNav from '@/components/main-nav';
import { dashboardConfig } from '@/config/dashboard';
import { DashboardNav } from '@/components/dashboard-nav';
import SiteFooter from '@/components/site-footer';
import { UserNav } from '@/components/user-nav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserNav />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] md:flex flex-col">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex flex-col flex-1 w-full overflow-hidden ">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
