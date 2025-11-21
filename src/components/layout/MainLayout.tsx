import type { ReactNode } from 'react';
import { TopNavigation } from './TopNavigation';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      <main className="flex">
        {children}
      </main>
    </div>
  );
}
