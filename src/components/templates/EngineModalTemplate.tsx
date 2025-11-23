import type { ReactNode } from 'react';
import { useState } from 'react';
import { Modal } from '../molecules/Modal';
import { StepSidebar, type StepId } from '../organisms/StepSidebar';
import { WorkspacePanel } from '../organisms/WorkspacePanel';

export interface EngineModalTemplateProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  projectName?: string;
  children: (activeStep: StepId) => ReactNode;
}

export function EngineModalTemplate({
  isOpen,
  onClose,
  title,
  projectName,
  children,
}: EngineModalTemplateProps) {
  const [activeStep, setActiveStep] = useState<StepId>('settings');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="full">
      <div className="flex h-full">
        {/* Left Sidebar - Steps */}
        <StepSidebar
          activeStep={activeStep}
          onStepChange={setActiveStep}
          completedSteps={[]}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8" role="main">
          {children(activeStep)}
        </main>

        {/* Right Panel - Workspace Utilities */}
        <WorkspacePanel projectName={projectName} />
      </div>
    </Modal>
  );
}
