import type { SupportedFileType } from '../types/file.types';
import { SUPPORTED_FILE_EXTENSIONS, MAX_FILE_SIZES } from '../config/app.config';

/**
 * Validate file type based on extension
 */
export function validateFileType(file: File): SupportedFileType | null {
  const fileName = file.name.toLowerCase();
  
  for (const [type, extensions] of Object.entries(SUPPORTED_FILE_EXTENSIONS)) {
    if (extensions.some(ext => fileName.endsWith(ext))) {
      return type as SupportedFileType;
    }
  }
  
  return null;
}

/**
 * Validate file size
 */
export function validateFileSize(file: File, type: SupportedFileType): boolean {
  const maxSize = MAX_FILE_SIZES[type];
  return file.size <= maxSize;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Generate unique file ID
 */
export function generateFileId(): string {
  return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
