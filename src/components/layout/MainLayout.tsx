import type { ReactNode } from 'react';
import { TopNavigation } from './TopNavigation';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-fill/30 to-white">
      <TopNavigation />
      <main className="flex">
        {children}
      </main>
    </div>
  );
}
