import { Link, useLocation } from 'react-router-dom';
import { ENGINES, APP_NAME } from '../../config/app.config';
import { cn } from '../../lib/utils';
import { Activity } from 'lucide-react';

export function TopNavigation() {
  const location = useLocation();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* App Logo and Name */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🎓</div>
            <h1 className="text-xl font-bold text-gray-900">{APP_NAME}</h1>
          </div>

          {/* Engine Navigation */}
          <nav className="flex items-center space-x-2">
            {ENGINES.map((engine) => (
              <Link
                key={engine.id}
                to={`/${engine.id}`}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium text-sm transition-all',
                  'hover:bg-gray-100',
                  engine.enabled
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed opacity-50',
                  location.pathname === `/${engine.id}`
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700'
                )}
                onClick={(e) => {
                  if (!engine.enabled) {
                    e.preventDefault();
                  }
                }}
              >
                <span className="mr-2">{engine.icon}</span>
                {engine.name}
              </Link>
            ))}

            {/* System Health Button */}
            <Link
              to="/system-health"
              className={cn(
                'px-4 py-2 rounded-lg font-medium text-sm transition-all',
                'hover:bg-green-100 flex items-center space-x-2',
                location.pathname === '/system-health'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700'
              )}
            >
              <Activity className="w-4 h-4" />
              <span>System Health</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
