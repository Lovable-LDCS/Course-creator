import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ENGINES, APP_NAME } from '../../config/app.config';
import { cn } from '../../lib/utils';
import { Activity } from 'lucide-react';
import { VoiceoverEngineModal } from '../engines/voiceover/VoiceoverEngineModal';

export function TopNavigation() {
  const location = useLocation();
  const [activeEngineModal, setActiveEngineModal] = useState<string | null>(null);

  const handleEngineClick = (engineId: string, enabled: boolean) => {
    if (enabled) {
      setActiveEngineModal(engineId);
    }
  };

  return (
    <>
      <header className="bg-gradient-to-r from-primary to-secondary border-b border-primary-700 sticky top-0 z-50 shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* App Logo and Name */}
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🎬</div>
              <h1 className="text-xl font-bold text-white">{APP_NAME}</h1>
            </div>

            {/* Engine Tabs Navigation */}
            <nav className="flex items-center space-x-1">
              {ENGINES.map((engine, index) => (
                <button
                  key={engine.id}
                  onClick={() => handleEngineClick(engine.id, engine.enabled)}
                  disabled={!engine.enabled}
                  className={cn(
                    'px-6 py-2.5 font-medium text-sm transition-all relative',
                    'border-b-2',
                    engine.enabled
                      ? 'cursor-pointer text-white hover:bg-white/10 border-transparent hover:border-white/50'
                      : 'cursor-not-allowed opacity-40 text-white/60 border-transparent',
                    activeEngineModal === engine.id
                      ? 'bg-white/20 border-white'
                      : ''
                  )}
                  title={engine.enabled ? engine.description : 'Coming soon'}
                >
                  <span className="mr-2">{engine.icon}</span>
                  <span>Engine {index + 1}: {engine.name}</span>
                </button>
              ))}

              {/* System Health Button */}
              <a
                href="/system-health"
                className={cn(
                  'px-4 py-2 rounded-lg font-medium text-sm transition-all ml-4',
                  'bg-white/10 hover:bg-white/20 flex items-center space-x-2 text-white border border-white/30'
                )}
              >
                <Activity className="w-4 h-4" />
                <span>System Health</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Engine Modals */}
      <VoiceoverEngineModal
        isOpen={activeEngineModal === 'engine1'}
        onClose={() => setActiveEngineModal(null)}
      />
      {/* Add other engine modals here as they are implemented */}
    </>
  );
}
