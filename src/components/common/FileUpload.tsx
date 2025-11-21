import { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  onFileSelect: (files: File[]) => void;
  disabled?: boolean;
}

export function FileUpload({
  accept,
  multiple = false,
  onFileSelect,
  disabled = false,
}: FileUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      onFileSelect(files);
    },
    [onFileSelect, disabled]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        onFileSelect(files);
      }
    },
    [onFileSelect]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={cn(
        'border-2 border-dashed rounded-lg p-12 text-center transition-colors',
        disabled
          ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
          : 'border-gray-300 hover:border-primary-500 cursor-pointer bg-white'
      )}
    >
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <p className="text-lg font-medium text-gray-700 mb-2">
        {disabled ? 'Upload disabled' : 'Drop files here or click to browse'}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        {accept ? `Supported formats: ${accept}` : 'All file types supported'}
      </p>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInput}
        disabled={disabled}
        className="hidden"
        id="file-upload-input"
      />
      <label
        htmlFor="file-upload-input"
        className={cn(
          'inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-medium cursor-pointer hover:bg-primary-700 transition-colors',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        Select Files
      </label>
    </div>
  );
}
