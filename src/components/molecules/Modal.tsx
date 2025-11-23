import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'xl',
  className,
}: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-[95vw] h-[95vh]',
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/80 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className={cn(
            'relative w-full bg-white rounded-xl shadow-2xl transform transition-all',
            sizeClasses[size],
            size === 'full' && 'h-[95vh]',
            className
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary to-secondary border-b border-primary-700">
            <h2
              id="modal-title"
              className="text-xl font-bold text-white"
            >
              {title}
            </h2>
            <button
              type="button"
              className="rounded-lg p-2 hover:bg-white/20 transition-colors"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className={cn('overflow-y-auto', size === 'full' ? 'h-[calc(95vh-80px)]' : 'max-h-[80vh]')}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
