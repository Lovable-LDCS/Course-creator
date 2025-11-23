import type { Engine } from '../types/engine.types';

export const APP_NAME = 'Video Factory';
export const APP_VERSION = '1.0.0';

export const ENGINES: Engine[] = [
  {
    id: 'engine1',
    name: 'Voiceover',
    description: 'Transform PowerPoint and MP4 files into voice-enabled content',
    icon: '🎙️',
    enabled: true,
  },
  {
    id: 'engine2',
    name: 'PPT/MP4 → Video',
    description: 'Create professional training videos from presentations and media',
    icon: '🎬',
    enabled: true,
  },
  {
    id: 'engine3',
    name: 'Engine 3',
    description: 'Future engine placeholder',
    icon: '🚀',
    enabled: false,
  },
  {
    id: 'engine4',
    name: 'Engine 4',
    description: 'Future engine placeholder',
    icon: '📦',
    enabled: false,
  },
];

export const MAX_FILE_SIZES = {
  pptx: 100 * 1024 * 1024, // 100 MB
  mp4: 500 * 1024 * 1024,  // 500 MB
  docx: 50 * 1024 * 1024,  // 50 MB
  pdf: 50 * 1024 * 1024,   // 50 MB
  txt: 10 * 1024 * 1024,   // 10 MB
  md: 10 * 1024 * 1024,    // 10 MB
};

export const SUPPORTED_FILE_EXTENSIONS = {
  pptx: ['.pptx', '.ppt'],
  docx: ['.docx', '.doc'],
  pdf: ['.pdf'],
  mp4: ['.mp4', '.mov', '.avi'],
  txt: ['.txt'],
  md: ['.md'],
};
