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
    <nav className="w-72 bg-gradient-to-b from-primary to-primary-800 border-r border-primary-900 p-6 shadow-xl" role="navigation" aria-label="Steps">
      <div className="mb-6">
        <h3 className="text-white font-semibold text-lg mb-1">Workflow Steps</h3>
        <p className="text-primary-200 text-xs">Follow these steps to create your video</p>
      </div>
      <div className="space-y-2">
        {STEPS.map((step, index) => {
          const isActive = step.id === activeStep;
          const isCompleted = completedSteps.includes(step.id);

          return (
            <button
              key={step.id}
              onClick={() => onStepChange(step.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all',
                'focus:outline-none focus:ring-2 focus:ring-white/50',
                isActive
                  ? 'bg-white text-primary shadow-lg scale-105'
                  : isCompleted
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all",
                isActive
                  ? 'bg-secondary text-white shadow-md'
                  : isCompleted
                  ? 'bg-success text-white'
                  : 'bg-white/20 text-white'
              )}>
                {isCompleted && !isActive ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.icon
                )}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={cn(
                    "text-xs font-semibold",
                    isActive ? 'text-secondary' : 'text-inherit'
                  )}>
                    Step {index + 1}
                  </span>
                  {isCompleted && !isActive && (
                    <span className="text-xs text-success font-medium">✓</span>
                  )}
                </div>
                <div className={cn(
                  "text-sm font-medium",
                  isActive && 'font-semibold'
                )}>{step.label}</div>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
