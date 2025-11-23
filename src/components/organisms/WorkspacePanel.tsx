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
      className={cn('w-80 bg-white border-l border-gray-200 flex flex-col', className)}
      role="complementary"
      aria-label="Workspace utilities"
    >
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveView('chat')}
          className={cn(
            'flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
            activeView === 'chat'
              ? 'border-primary-500 text-primary-700'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
              ? 'border-primary-500 text-primary-700'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
              ? 'border-primary-500 text-primary-700'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
            <h3 className="text-sm font-semibold text-gray-900">AI Assistant</h3>
            <p className="text-sm text-gray-600">
              Chat with the AI to refine your plan, adjust scripts, or get suggestions.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
              <p className="italic">Chat functionality coming soon...</p>
            </div>
          </div>
        )}

        {activeView === 'summary' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Project Summary</h3>
            {projectName ? (
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Project:</span>
                  <p className="font-medium text-gray-900">{projectName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <p className="text-gray-900">In Progress</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600">No project selected</p>
            )}
          </div>
        )}

        {activeView === 'timeline' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Timeline Preview</h3>
            <p className="text-sm text-gray-600">
              Timeline view will show your video tracks, voice-over segments, and overlays.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
              <p className="italic">Timeline functionality coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
          Save Draft
        </button>
        <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
          Save Project
        </button>
      </div>
    </aside>
  );
}
