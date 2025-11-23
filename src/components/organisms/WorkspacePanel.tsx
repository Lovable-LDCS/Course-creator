import { MessageSquare, FileText, Calendar } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

type PanelView = 'chat' | 'summary' | 'timeline';

export interface WorkspacePanelProps {
  projectName?: string;
  className?: string;
}

export function WorkspacePanel({ projectName, className }: WorkspacePanelProps) {
  const [activeView, setActiveView] = useState<PanelView>('chat');

  return (
    <aside
      className={cn('w-80 bg-gradient-to-b from-fill to-white border-l border-gray-300 flex flex-col shadow-inner', className)}
      role="complementary"
      aria-label="Workspace utilities"
    >
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-300 bg-white">
        <button
          onClick={() => setActiveView('chat')}
          className={cn(
            'flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
            activeView === 'chat'
              ? 'border-secondary text-secondary bg-fill/50'
              : 'border-transparent text-gray-500 hover:text-primary hover:bg-gray-50'
          )}
          aria-selected={activeView === 'chat'}
          role="tab"
        >
          <MessageSquare className="w-4 h-4 inline mr-2" />
          Chat
        </button>
        <button
          onClick={() => setActiveView('summary')}
          className={cn(
            'flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
            activeView === 'summary'
              ? 'border-secondary text-secondary bg-fill/50'
              : 'border-transparent text-gray-500 hover:text-primary hover:bg-gray-50'
          )}
          aria-selected={activeView === 'summary'}
          role="tab"
        >
          <FileText className="w-4 h-4 inline mr-2" />
          Summary
        </button>
        <button
          onClick={() => setActiveView('timeline')}
          className={cn(
            'flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
            activeView === 'timeline'
              ? 'border-secondary text-secondary bg-fill/50'
              : 'border-transparent text-gray-500 hover:text-primary hover:bg-gray-50'
          )}
          aria-selected={activeView === 'timeline'}
          role="tab"
        >
          <Calendar className="w-4 h-4 inline mr-2" />
          Timeline
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4" role="tabpanel">
        {activeView === 'chat' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-primary">AI Assistant</h3>
            <p className="text-sm text-gray-600">
              Chat with the AI to refine your plan, adjust scripts, or get suggestions.
            </p>
            <div className="bg-white rounded-lg p-4 border border-tertiary shadow-sm text-sm text-gray-700">
              <p className="italic">Chat functionality coming soon...</p>
            </div>
          </div>
        )}

        {activeView === 'summary' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-primary">Project Summary</h3>
            {projectName ? (
              <div className="bg-white rounded-lg p-4 border border-tertiary shadow-sm space-y-3 text-sm">
                <div>
                  <span className="text-gray-600 font-medium">Project:</span>
                  <p className="font-semibold text-primary mt-1">{projectName}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Status:</span>
                  <p className="text-secondary font-semibold mt-1">In Progress</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600">No project selected</p>
            )}
          </div>
        )}

        {activeView === 'timeline' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-primary">Timeline Preview</h3>
            <p className="text-sm text-gray-600">
              Timeline view will show your video tracks, voice-over segments, and overlays.
            </p>
            <div className="bg-white rounded-lg p-4 border border-tertiary shadow-sm text-sm text-gray-700">
              <p className="italic">Timeline functionality coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-300 bg-white space-y-2">
        <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium border border-gray-300">
          Save Draft
        </button>
        <button className="w-full px-4 py-2 bg-gradient-to-r from-secondary to-tertiary text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold">
          Save Project
        </button>
      </div>
    </aside>
  );
}
