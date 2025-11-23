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
        'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden',
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
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm">
                  {number}
                </span>
              )}
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1 ml-11">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}
