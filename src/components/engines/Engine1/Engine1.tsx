import { useState } from 'react';
import { Sidebar } from '../../layout/Sidebar';
import { AudioPlayer } from './AudioPlayer';
import { Button } from '../../common/Button';
import { useAudioGeneration } from '../../../hooks/useAudioGeneration';
import { useAI } from '../../../contexts/AIContext';
import { TTS_VOICES } from '../../../config/ai-models.config';
import type { TTSVoice } from '../../../types/ai.types';
import { Mic } from 'lucide-react';

export function Engine1() {
  const { isConfigured, isConnected, error: aiError } = useAI();
  const { isGenerating, audioUrl, error: audioError, generateAudio, download } = useAudioGeneration();
  
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<TTSVoice>('nova');
  const [speed, setSpeed] = useState(1.0);
  const [showEmptyTextWarning, setShowEmptyTextWarning] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setShowEmptyTextWarning(true);
      setTimeout(() => setShowEmptyTextWarning(false), 3000);
      return;
    }

    setShowEmptyTextWarning(false);
    await generateAudio(text, selectedVoice, speed);
  };

  return (
    <>
      <Sidebar>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Voice Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Voice Selection
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value as TTSVoice)}
              disabled={isGenerating}
            >
              {TTS_VOICES.map((voice) => (
                <option key={voice} value={voice}>
                  {voice.charAt(0).toUpperCase() + voice.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Speed: {speed.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={isGenerating}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0.5x</span>
              <span>2.0x</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option>MP3</option>
              <option>WAV</option>
              <option>PPTX with Audio</option>
            </select>
          </div>
        </div>
      </Sidebar>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Voice-Over Generator</h1>
        <p className="text-gray-600 mb-8">
          Transform PowerPoint presentations and MP4 files into voice-enabled content
        </p>

        {/* API Status */}
        {!isConfigured && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              <strong>API Not Configured:</strong> {aiError}
            </p>
          </div>
        )}

        {isConfigured && !isConnected && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">
              <strong>Connection Error:</strong> {aiError}
            </p>
          </div>
        )}

        {/* Text Input Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4">Text to Speech</h2>
          <p className="text-gray-600 mb-4">
            Enter text below to generate professional voice-over audio
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Text
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[200px]"
                placeholder="Enter the text you want to convert to speech..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isGenerating || !isConfigured}
              />
              <p className="text-sm text-gray-500 mt-1">
                {text.length} characters
              </p>
            </div>

            {showEmptyTextWarning && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  <strong>⚠️ Warning:</strong> Please enter some text to convert to speech.
                </p>
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !isConfigured || !text.trim()}
              className="w-full"
            >
              <Mic size={16} className="mr-2" />
              {isGenerating ? 'Generating Audio...' : 'Generate Audio'}
            </Button>

            {audioError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">
                  <strong>Error:</strong> {audioError}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Audio Player */}
        {audioUrl && (
          <AudioPlayer 
            audioUrl={audioUrl} 
            onDownload={() => download(`voice-over-${Date.now()}.mp3`)}
          />
        )}

        {/* File Upload Section (Future) */}
        <div className="bg-white rounded-lg shadow p-8 opacity-50">
          <h2 className="text-xl font-semibold mb-4">Upload Content (Coming Soon)</h2>
          <p className="text-gray-600 mb-4">
            Supported formats: PowerPoint (.pptx) and Video (.mp4)
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-lg text-gray-700 mb-2">Drag and drop your files here</p>
            <p className="text-sm text-gray-500">or click to browse</p>
          </div>
        </div>
      </div>
    </>
  );
}
