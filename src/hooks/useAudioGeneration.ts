import { useState } from 'react';
import { synthesizeSpeech, downloadAudio, createAudioURL } from '../services/ai/tts.service';
import type { TTSVoice } from '../types/ai.types';

interface AudioGenerationState {
  isGenerating: boolean;
  audioUrl: string | null;
  audioBlob: Blob | null;
  error: string | null;
}

export function useAudioGeneration() {
  const [state, setState] = useState<AudioGenerationState>({
    isGenerating: false,
    audioUrl: null,
    audioBlob: null,
    error: null,
  });

  const generateAudio = async (text: string, voice: TTSVoice, speed: number = 1.0) => {
    // Clear previous audio
    if (state.audioUrl) {
      URL.revokeObjectURL(state.audioUrl);
    }

    setState({
      isGenerating: true,
      audioUrl: null,
      audioBlob: null,
      error: null,
    });

    try {
      const blob = await synthesizeSpeech({ text, voice, speed });
      const url = createAudioURL(blob);

      setState({
        isGenerating: false,
        audioUrl: url,
        audioBlob: blob,
        error: null,
      });
    } catch (err) {
      setState({
        isGenerating: false,
        audioUrl: null,
        audioBlob: null,
        error: err instanceof Error ? err.message : 'Failed to generate audio',
      });
    }
  };

  const download = (filename: string = 'audio.mp3') => {
    if (state.audioBlob) {
      downloadAudio(state.audioBlob, filename);
    }
  };

  const clear = () => {
    if (state.audioUrl) {
      URL.revokeObjectURL(state.audioUrl);
    }
    setState({
      isGenerating: false,
      audioUrl: null,
      audioBlob: null,
      error: null,
    });
  };

  return {
    ...state,
    generateAudio,
    download,
    clear,
  };
}
