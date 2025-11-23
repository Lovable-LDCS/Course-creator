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
              <h2 className="text-2xl font-bold text-primary mb-2">Settings</h2>
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
                  <label className="block text-sm font-medium text-primary mb-2">
                    Default Language
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Voice Selection
                  </label>
                  <select
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
                  >
                    {TTS_VOICES.map((voice) => (
                      <option key={voice} value={voice}>
                        {voice.charAt(0).toUpperCase() + voice.slice(1)}
                      </option>
                    ))}
                  </select>
                  <button className="mt-2 text-sm text-secondary hover:text-secondary/80 font-medium">
                    ▶ Play Sample
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Voice Speed: {speed.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-secondary"
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
                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-secondary rounded focus:ring-secondary"
                  />
                  <span className="text-sm text-gray-700">
                    Enable captions by default
                  </span>
                </label>
                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-secondary rounded focus:ring-secondary"
                  />
                  <span className="text-sm text-gray-700">
                    Generate transcript files (.srt)
                  </span>
                </label>
                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-secondary rounded focus:ring-secondary"
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
                  <label className="block text-sm font-medium text-primary mb-2">
                    Company Logo
                  </label>
                  <div className="border-2 border-dashed border-tertiary rounded-lg p-6 text-center bg-fill/30 hover:bg-fill/50 transition-colors cursor-pointer">
                    <p className="text-sm text-primary font-medium">Drag and drop logo or click to browse</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG (Max 2MB)</p>
                  </div>
                </div>
                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-secondary rounded focus:ring-secondary"
                  />
                  <span className="text-sm text-gray-700">
                    Include intro template (3 seconds)
                  </span>
                </label>
                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-secondary rounded focus:ring-secondary"
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
              <h2 className="text-2xl font-bold text-primary mb-2">Projects</h2>
              <p className="text-gray-600">
                Create and manage your project structure: Projects → Units → Modules → Lessons
              </p>
            </div>

            <Card title="Create Project" subtitle="Set up your project hierarchy" number="2.1">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Project Name
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g., History of Human Rights"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
                    />
                    <button className="px-6 py-2 bg-gradient-to-r from-secondary to-tertiary text-white rounded-lg hover:shadow-lg transition-all font-medium">
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
                <div className="bg-fill/50 rounded-lg p-4 border border-tertiary">
                  <p className="font-semibold text-primary mb-3">Example Structure:</p>
                  <div className="ml-4 space-y-1 text-gray-700">
                    <div className="font-medium">📁 History of Human Rights</div>
                    <div className="ml-4">📁 Origins</div>
                    <div className="ml-8">📁 Module A</div>
                    <div className="ml-12 text-secondary">🎬 01 - History of human rights.mp4</div>
                    <div className="ml-12 text-secondary">🎬 02 - Universal declaration.mp4</div>
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
              <h2 className="text-2xl font-bold text-primary mb-2">Contextualise</h2>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary min-h-[200px] transition-all"
                placeholder="Describe your course objectives, target audience, key learning outcomes..."
              />
              <p className="text-sm text-gray-500 mt-2">0 / 5000 characters</p>
            </Card>

            <Card
              title="Upload Context Documents"
              subtitle="Upload supporting materials for AI analysis (PDF, DOCX, PPTX)"
              number="3.2"
            >
              <div className="border-2 border-dashed border-tertiary rounded-lg p-8 text-center bg-fill/30 hover:bg-fill/50 transition-colors cursor-pointer">
                <div className="text-5xl mb-3">📄</div>
                <p className="text-sm text-primary font-medium mb-1">
                  Drag and drop files here or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  Supported: PDF, DOCX, PPTX (Max 50MB each)
                </p>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <p className="font-medium mb-1">These files provide AI with context about:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Subject matter and domain knowledge</li>
                  <li>Terminology and industry-specific language</li>
                  <li>Company standards and guidelines</li>
                </ul>
              </div>
            </Card>

            <Card
              title="Target Audience"
              subtitle="Help AI tailor content to your specific audience"
              number="3.3"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-3">
                    Industry (Select One)
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto p-2 bg-gray-50 rounded-lg">
                    {[
                      'Healthcare / Medical',
                      'Pharmaceutical / Biotech',
                      'Finance & Banking',
                      'Insurance',
                      'Information Technology / Software / SaaS',
                      'Manufacturing & Industrial',
                      'Construction & Engineering',
                      'Energy / Oil & Gas / Utilities',
                      'Mining',
                      'Transportation / Logistics / Shipping',
                      'Retail & eCommerce',
                      'Hospitality & Tourism',
                      'Food & Beverage / FMCG',
                      'Education / Higher Ed / K-12',
                      'Government / Public Sector',
                      'Legal & Compliance',
                      'Telecommunications',
                      'Real Estate & Property',
                      'Automotive & Mobility',
                      'Aerospace & Defense',
                      'Media, Entertainment & Creative Agencies',
                      'Nonprofit / NGO / Social Services',
                      'Agriculture & Agritech',
                      'Beauty, Fashion & Lifestyle',
                    ].map((industry) => (
                      <label key={industry} className="flex items-start gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="industry"
                          className="mt-0.5 w-4 h-4 text-secondary focus:ring-secondary flex-shrink-0"
                        />
                        <span className="text-sm text-gray-700">{industry}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-3">
                    Worker Level (Select Multiple)
                  </label>
                  <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                    {['Novice', 'Intermediate', 'Advanced', 'Expert'].map((level) => (
                      <label key={level} className="flex items-center gap-3 p-2 hover:bg-white rounded cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-secondary rounded focus:ring-secondary"
                        />
                        <span className="text-sm font-medium text-gray-700">{level}</span>
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
              <h2 className="text-2xl font-bold text-primary mb-2">Feed the Beast</h2>
              <p className="text-gray-600">Upload your source content (MP4, PPTX, or both)</p>
            </div>

            <Card
              title="Upload Source Files"
              subtitle="Provide the base content for voice-over generation"
              number="4.1"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    PowerPoint Presentation
                  </label>
                  <div className="border-2 border-dashed border-tertiary rounded-lg p-6 text-center bg-fill/30 hover:bg-fill/50 transition-colors cursor-pointer">
                    <div className="text-5xl mb-2">📊</div>
                    <p className="text-sm text-primary font-medium">Upload PPTX file</p>
                    <p className="text-xs text-gray-500 mt-1">Max 100MB</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Video File (Optional)
                  </label>
                  <div className="border-2 border-dashed border-tertiary rounded-lg p-6 text-center bg-fill/30 hover:bg-fill/50 transition-colors cursor-pointer">
                    <div className="text-5xl mb-2">🎬</div>
                    <p className="text-sm text-primary font-medium">Upload MP4 file or paste YouTube URL</p>
                    <p className="text-xs text-gray-500 mt-1">Max 500MB</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Or Paste YouTube URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
                    />
                    <button className="px-6 py-2 bg-gradient-to-r from-secondary to-tertiary text-white rounded-lg hover:shadow-lg transition-all font-medium">
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
              <h2 className="text-2xl font-bold text-primary mb-2">Plan</h2>
              <p className="text-gray-600">
                Generate, review, and finalize your voice-over narration plan
              </p>
            </div>

            <Card
              title="External Media"
              subtitle="Upload external video clips, animations, or GIFs to incorporate into the final video"
              number="5.1"
            >
              <div className="space-y-4">
                <div className="border-2 border-dashed border-tertiary rounded-lg p-6 text-center bg-fill/30 hover:bg-fill/50 transition-colors cursor-pointer">
                  <div className="text-4xl mb-3">🎥</div>
                  <p className="text-sm text-primary font-medium mb-1">
                    Upload external media clips
                  </p>
                  <p className="text-xs text-gray-500">
                    YouTube URLs, MP4, GIF, animations (Max 100MB each)
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>AI Integration:</strong> The AI will automatically handle pre and post narration for inserted clips, ensuring smooth transitions.
                  </p>
                </div>
              </div>
            </Card>

            <Card
              title="Generate Narration Plan & AI Chat"
              subtitle="Let AI analyze your content and create a professional voice-over script"
              number="5.2"
            >
              <div className="space-y-4">
                <button className="w-full px-6 py-4 bg-gradient-to-r from-secondary to-tertiary text-white rounded-lg hover:shadow-lg transition-all font-semibold text-lg flex items-center justify-center gap-2">
                  <span className="text-2xl">🤖</span>
                  <span>Generate Narration Plan</span>
                </button>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    AI will analyze your uploaded content and context to create a detailed narration plan with:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span>
                      <span>Script lines synchronized with video timestamps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span>
                      <span>Video thumbnail previews for each segment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary">•</span>
                      <span>Timing and pacing recommendations</span>
                    </li>
                  </ul>
                </div>

                {/* AI Chat Interface */}
                <div className="border-2 border-tertiary rounded-lg p-4 bg-white">
                  <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <span>💬</span>
                    <span>AI Chat - Request Changes</span>
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded p-3 text-sm text-gray-600 min-h-[100px]">
                      <p className="italic">Generate a plan first to start chatting with AI...</p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g., Replace 'utilize' with 'use' throughout the script..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
                        disabled
                      />
                      <button
                        disabled
                        className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Consumption Indicator */}
                <div className="bg-gradient-to-r from-fill to-tertiary/20 rounded-lg p-4 border border-tertiary">
                  <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <span>📊</span>
                    <span>AI Context Interpretation</span>
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Document Analysis</span>
                      <span className="font-semibold text-secondary">--</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Industry Alignment</span>
                      <span className="font-semibold text-secondary">--</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Audience Targeting</span>
                      <span className="font-semibold text-secondary">--</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 italic">
                      Indicators will show after plan generation
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              title="Choose Voice & Music"
              subtitle="Select voice characteristics and background music options"
              number="5.3"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Voice Selection
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TTS_VOICES.map((voice) => (
                      <div key={voice} className="border border-gray-300 rounded-lg p-3 hover:border-secondary hover:bg-fill/30 cursor-pointer transition-all">
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer flex-1">
                            <input
                              type="radio"
                              name="voice"
                              value={voice}
                              checked={selectedVoice === voice}
                              onChange={(e) => setSelectedVoice(e.target.value)}
                              className="w-4 h-4 text-secondary focus:ring-secondary"
                            />
                            <span className="text-sm font-medium text-gray-900">
                              {voice.charAt(0).toUpperCase() + voice.slice(1)}
                            </span>
                          </label>
                          <button className="text-secondary hover:text-secondary/80 text-xs px-2 py-1 rounded hover:bg-secondary/10 transition-colors">
                            ▶ Play
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Background Music
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-secondary rounded focus:ring-secondary"
                      />
                      <span className="text-sm text-gray-700">Enable background music</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer ml-6">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-secondary rounded focus:ring-secondary"
                      />
                      <span className="text-sm text-gray-700">Auto-fade when voice starts</span>
                    </label>
                  </div>
                  <div className="mt-3">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary text-sm">
                      <option value="">Select music track</option>
                      <option value="corporate">Corporate & Professional</option>
                      <option value="upbeat">Upbeat & Energetic</option>
                      <option value="calm">Calm & Focused</option>
                      <option value="inspiring">Inspiring & Motivational</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              title="Approve & Render"
              subtitle="Review and approve the plan to start video rendering"
              number="5.4"
            >
              <div className="space-y-4">
                <button
                  disabled
                  className="w-full px-6 py-4 bg-gradient-to-r from-success to-green-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500 flex items-center justify-center gap-2"
                >
                  <span className="text-xl">✓</span>
                  <span>Approve Plan & Start Rendering</span>
                </button>
                <p className="text-sm text-gray-600 text-center">
                  Generate and review the plan first before approving
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
      title="Engine 1: Voiceover Generator"
      projectName="History of Human Rights"
    >
      {renderStepContent}
    </EngineModalTemplate>
  );
}
