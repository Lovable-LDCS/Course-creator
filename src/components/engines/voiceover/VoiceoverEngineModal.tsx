import { useState } from 'react';
import { EngineModalTemplate } from '../../templates/EngineModalTemplate';
import type { StepId } from '../../organisms/StepSidebar';
import { Card } from '../../molecules/Card';
import { TTS_VOICES } from '../../../config/ai-models.config';

export interface VoiceoverEngineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VoiceoverEngineModal({ isOpen, onClose }: VoiceoverEngineModalProps) {
  const [selectedVoice, setSelectedVoice] = useState('nova');
  const [speed, setSpeed] = useState(1.0);

  const renderStepContent = (activeStep: StepId) => {
    switch (activeStep) {
      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
              <p className="text-gray-600">
                Configure your project settings, voice preferences, and accessibility options.
              </p>
            </div>

            <Card
              title="Project-Level Settings"
              subtitle="Configure default voice and language settings for this project"
              number="1.1"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Language
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voice Selection
                  </label>
                  <select
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {TTS_VOICES.map((voice) => (
                      <option key={voice} value={voice}>
                        {voice.charAt(0).toUpperCase() + voice.slice(1)}
                      </option>
                    ))}
                  </select>
                  <button className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium">
                    ▶ Play Sample
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voice Speed: {speed.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0.5x (Slow)</span>
                    <span>2.0x (Fast)</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              title="Accessibility Settings"
              subtitle="Ensure your content is accessible to all learners"
              number="1.2"
            >
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">
                    Enable captions by default
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">
                    Generate transcript files (.srt)
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">
                    Limit playback speed (0.75x - 1.25x)
                  </span>
                </label>
              </div>
            </Card>

            <Card
              title="Branding"
              subtitle="Customize your video branding elements"
              number="1.3"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Logo
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="text-sm text-gray-600">Drag and drop logo or click to browse</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG (Max 2MB)</p>
                  </div>
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">
                    Include intro template (3 seconds)
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">
                    Include outro template (5 seconds)
                  </span>
                </label>
              </div>
            </Card>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
              <p className="text-gray-600">
                Create and manage your project structure: Projects → Units → Modules → Lessons
              </p>
            </div>

            <Card title="Create Project" subtitle="Set up your project hierarchy" number="2.1">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g., History of Human Rights"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                      Create
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Projects help organize your learning content into a structured hierarchy.
                    Each lesson will become a separate video file.
                  </p>
                </div>
              </div>
            </Card>

            <Card title="Project Structure" subtitle="Manage units, modules, and lessons" number="2.2">
              <div className="text-sm text-gray-600">
                <p className="mb-4">No project created yet. Create a project to get started.</p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="font-medium text-gray-900 mb-2">Example Structure:</p>
                  <div className="ml-4 space-y-1 text-gray-700">
                    <div>📁 History of Human Rights</div>
                    <div className="ml-4">📁 Origins</div>
                    <div className="ml-8">📁 Module A</div>
                    <div className="ml-12">🎬 01 - History of human rights.mp4</div>
                    <div className="ml-12">🎬 02 - Universal declaration.mp4</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'contextualise':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Contextualise</h2>
              <p className="text-gray-600">
                Provide context to help AI understand your content and target audience
              </p>
            </div>

            <Card
              title="Free Text Context"
              subtitle="Describe your project, goals, and any specific instructions"
              number="3.1"
            >
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[200px]"
                placeholder="Describe your course objectives, target audience, key learning outcomes, and any specific requirements..."
              />
              <p className="text-sm text-gray-500 mt-2">0 / 5000 characters</p>
            </Card>

            <Card
              title="Upload Context Documents"
              subtitle="Upload supporting materials for AI analysis"
              number="3.2"
            >
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="text-4xl mb-3">📄</div>
                <p className="text-sm text-gray-700 mb-1">
                  Drag and drop files here or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  Supported: PDF, DOCX, PPTX (Max 50MB each)
                </p>
              </div>
            </Card>

            <Card
              title="Target Audience"
              subtitle="Help AI tailor content to your audience"
              number="3.3"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Mining', 'Healthcare', 'Manufacturing', 'Construction', 'Education', 'Other'].map((industry) => (
                      <label key={industry} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{industry}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Worker Level
                  </label>
                  <div className="space-y-2">
                    {['Novice', 'Intermediate', 'Advanced', 'Expert'].map((level) => (
                      <label key={level} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="workerLevel"
                          className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'feed':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Feed the Beast</h2>
              <p className="text-gray-600">Upload your source content (MP4, PPTX, or both)</p>
            </div>

            <Card
              title="Upload Source Files"
              subtitle="Provide the base content for voice-over generation"
              number="4.1"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PowerPoint Presentation
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <p className="text-sm text-gray-700">Upload PPTX file</p>
                    <p className="text-xs text-gray-500 mt-1">Max 100MB</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video File (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-2">🎬</div>
                    <p className="text-sm text-gray-700">Upload MP4 file or paste YouTube URL</p>
                    <p className="text-xs text-gray-500 mt-1">Max 500MB</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or Paste YouTube URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'plan':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Plan</h2>
              <p className="text-gray-600">
                Generate, review, and approve your voice-over plan
              </p>
            </div>

            <Card
              title="External Media"
              subtitle="Add pre-roll or post-roll clips (optional)"
              number="5.1"
            >
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">
                    Include external media clips
                  </span>
                </label>
                <p className="text-sm text-gray-600">
                  When enabled, you can add intro/outro clips or additional media segments
                </p>
              </div>
            </Card>

            <Card
              title="Generate Plan"
              subtitle="Let AI create the voice-over script and timing"
              number="5.2"
            >
              <div className="space-y-4">
                <button className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-lg">
                  🤖 Generate Voice-Over Plan
                </button>
                <p className="text-sm text-gray-600 text-center">
                  AI will analyze your content and create a detailed narration plan
                </p>
              </div>
            </Card>

            <Card
              title="Review & Chat"
              subtitle="Review the generated plan and make adjustments"
              number="5.3"
            >
              <div className="bg-gray-50 rounded-lg p-6 text-center text-sm text-gray-600">
                <p>Generate a plan first to review and edit with AI assistance</p>
              </div>
            </Card>

            <Card
              title="Approve Plan"
              subtitle="Lock the plan and queue for rendering"
              number="5.4"
            >
              <div className="space-y-3">
                <button
                  disabled
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✓ Approve & Render
                </button>
                <p className="text-sm text-gray-600 text-center">
                  Review and approve the plan to start rendering
                </p>
              </div>
            </Card>
          </div>
        );

      default:
        return <div>Step content coming soon...</div>;
    }
  };

  return (
    <EngineModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      title="Voice-Over Generator"
      projectName="History of Human Rights"
    >
      {renderStepContent}
    </EngineModalTemplate>
  );
}
