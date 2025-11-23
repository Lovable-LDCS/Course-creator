import { Settings, FolderTree, FileText, Upload, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export type StepId = 'settings' | 'projects' | 'contextualise' | 'feed' | 'plan';

export interface Step {
  id: StepId;
  label: string;
  icon: React.ReactNode;
  completed?: boolean;
}

const STEPS: Step[] = [
  { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  { id: 'projects', label: 'Projects', icon: <FolderTree className="w-5 h-5" /> },
  { id: 'contextualise', label: 'Contextualise', icon: <FileText className="w-5 h-5" /> },
  { id: 'feed', label: 'Feed the Beast', icon: <Upload className="w-5 h-5" /> },
  { id: 'plan', label: 'Plan', icon: <CheckCircle className="w-5 h-5" /> },
];

export interface StepSidebarProps {
  activeStep: StepId;
  onStepChange: (step: StepId) => void;
  completedSteps?: StepId[];
}

export function StepSidebar({ activeStep, onStepChange, completedSteps = [] }: StepSidebarProps) {
  return (
    <nav className="w-64 bg-gray-50 border-r border-gray-200 p-4" role="navigation" aria-label="Steps">
      <div className="space-y-1">
        {STEPS.map((step, index) => {
          const isActive = step.id === activeStep;
          const isCompleted = completedSteps.includes(step.id);

          return (
            <button
              key={step.id}
              onClick={() => onStepChange(step.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all',
                'focus:outline-none focus:ring-2 focus:ring-primary-500',
                isActive
                  ? 'bg-primary-100 text-primary-900 font-medium shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm">
                {step.icon}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">
                    Step {index + 1}
                  </span>
                  {isCompleted && (
                    <CheckCircle className="w-4 h-4 text-green-600" aria-label="Completed" />
                  )}
                </div>
                <div className="text-sm">{step.label}</div>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
