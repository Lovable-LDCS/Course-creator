import { useState } from 'react';
import { ENGINES } from '../config/app.config';
import { VoiceoverEngineModal } from './engines/voiceover/VoiceoverEngineModal';

export function HomePage() {
  const [activeEngineModal, setActiveEngineModal] = useState<string | null>(null);

  const handleEngineClick = (engineId: string) => {
    setActiveEngineModal(engineId);
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-fill to-white">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <div className="text-7xl mb-6">🎬</div>
          <h1 className="text-5xl font-bold text-primary mb-4">
            Welcome to Video Factory
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Transform your educational content into professional training materials with AI-powered video creation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {ENGINES.filter((e) => e.enabled).map((engine) => (
            <button
              key={engine.id}
              onClick={() => handleEngineClick(engine.id)}
              className="bg-white rounded-xl shadow-xl p-10 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-secondary text-left w-full transform hover:-translate-y-1"
            >
              <div className="text-6xl mb-4">{engine.icon}</div>
              <h2 className="text-2xl font-bold text-primary mb-3">{engine.name}</h2>
              <p className="text-gray-600 mb-4">{engine.description}</p>
              <div className="mt-6 inline-flex items-center text-secondary font-semibold text-lg">
                Get Started →
              </div>
            </button>
          ))}
        </div>

        <VoiceoverEngineModal
          isOpen={activeEngineModal === 'engine1'}
          onClose={() => setActiveEngineModal(null)}
        />

        <div className="bg-white rounded-xl shadow-lg p-10 border-l-4 border-secondary">
          <h2 className="text-3xl font-bold text-primary mb-6">Platform Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <span className="text-2xl text-success flex-shrink-0">✓</span>
              <div>
                <h3 className="font-semibold text-primary mb-1">AI-Powered Content Generation</h3>
                <p className="text-gray-600">Advanced GPT-4 integration for intelligent script creation</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl text-success flex-shrink-0">✓</span>
              <div>
                <h3 className="font-semibold text-primary mb-1">Professional Voice Synthesis</h3>
                <p className="text-gray-600">Natural-sounding text-to-speech with multiple voice options</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl text-success flex-shrink-0">✓</span>
              <div>
                <h3 className="font-semibold text-primary mb-1">Automated Video Creation</h3>
                <p className="text-gray-600">Convert presentations to engaging video content automatically</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl text-success flex-shrink-0">✓</span>
              <div>
                <h3 className="font-semibold text-primary mb-1">Industry-Specific Customization</h3>
                <p className="text-gray-600">Tailored content for 24+ industries and skill levels</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl text-success flex-shrink-0">✓</span>
              <div>
                <h3 className="font-semibold text-primary mb-1">Context-Aware AI</h3>
                <p className="text-gray-600">Upload documents to provide rich context for better results</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl text-success flex-shrink-0">✓</span>
              <div>
                <h3 className="font-semibold text-primary mb-1">Quality Assurance</h3>
                <p className="text-gray-600">Comprehensive testing and validation for production-ready output</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
