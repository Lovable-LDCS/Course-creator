import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface CardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  className?: string;
  number?: string;
}

export function Card({
  title,
  subtitle,
  children,
  className,
  number,
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-md border-l-4 border-secondary overflow-hidden hover:shadow-lg transition-shadow',
        className
      )}
      role="region"
      aria-label={title}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              {number && (
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-tertiary text-white font-bold text-sm shadow-md">
                  {number}
                </span>
              )}
              <h3 className="text-lg font-bold text-primary">{title}</h3>
            </div>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-2 ml-12">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}
