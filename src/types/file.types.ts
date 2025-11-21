// File Types
export type SupportedFileType = 'pptx' | 'docx' | 'pdf' | 'mp4' | 'txt' | 'md';

export interface FileUpload {
  id: string;
  file: File;
  type: SupportedFileType;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  error?: string;
}

export interface ParsedContent {
  type: SupportedFileType;
  text?: string;
  slides?: SlideContent[];
  images?: ImageContent[];
  metadata?: FileMetadata;
}

export interface SlideContent {
  slideNumber: number;
  title?: string;
  content: string;
  notes?: string;
  imageUrls?: string[];
}

export interface ImageContent {
  url: string;
  alt?: string;
  caption?: string;
}

export interface FileMetadata {
  fileName: string;
  fileSize: number;
  createdAt: Date;
  author?: string;
  pages?: number;
  duration?: number; // for videos in seconds
  dimensions?: {
    width: number;
    height: number;
  };
}
