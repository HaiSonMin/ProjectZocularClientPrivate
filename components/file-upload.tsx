'use client';
import { deleteFile, uploadFile } from '@/app/apis/models/upload-file.apis';
import { Button } from '@/components/ui/button';
import { IFileUploadResponse } from '@/interfaces/models/IFileUploadResponse';
import {
  Upload,
  X,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileSpreadsheet,
  Eye
} from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { toast } from './ui/use-toast';

interface FileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  maxSize?: number; // in MB
  acceptedTypes?: string[]; // MIME types or extensions
  showPreview?: boolean;
  allowMultiple?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  disabled = false,
  maxSize = 50,
  acceptedTypes,
  showPreview = true,
  allowMultiple = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<IFileUploadResponse | null>(
    null
  );

  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return FileImage;
    if (type.startsWith('video/')) return FileVideo;
    if (type.startsWith('audio/')) return FileAudio;
    if (type.includes('text') || type.includes('document')) return FileText;
    if (type.includes('sheet') || type.includes('excel'))
      return FileSpreadsheet;
    return File;
  };

  useEffect(() => {
    if (value && !uploadedFile) {
      setUploadedFile({
        id: '',
        url: value,
        name: '', // hoặc extract từ value nếu có thể
        size: 0,
        type: '',
        createdBy: '',
        updatedBy: '',
        createdAt: '',
        updatedAt: '',
        path: '',
        md5: '',
        version: 1,
        isDraft: 0
      });
    }
  }, [value, uploadedFile]);

  // Validate file before upload
  const validateFile = (file: File): string | null => {
    if (acceptedTypes && acceptedTypes.length > 0) {
      const isValidType = acceptedTypes.some((type) => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        return (
          file.type === type || file.type.startsWith(type.replace('/*', ''))
        );
      });

      if (!isValidType) {
        return `Loại file không được hỗ trợ. Chỉ chấp nhận: ${acceptedTypes.join(
          ', '
        )}`;
      }
    }

    if (file.size > maxSize * 1024 * 1024) {
      return `File không được vượt quá ${maxSize}MB`;
    }

    return null;
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    const errorMsg = validateFile(file);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      setUploading(true);

      // Upload file
      const fileResponse = await uploadFile(file);
      console.log('fileResponse', fileResponse);

      setUploadedFile(fileResponse);
      onChange(fileResponse.url.replace('/stores-files', ''));
    } catch (error) {
      console.error('Upload error:', error);
      setError('Upload file thất bại. Vui lòng thử lại.');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = async () => {
    try {
      if (uploadedFile?.id) {
        const res = await deleteFile(uploadedFile.id);

        toast({
          title: 'success',
          variant: 'destructive',
          description: res.message
        });
      }

      // Reset UI
      setUploadedFile(null);
      onChange('');
      setError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      setError('Xóa file thất bại. Vui lòng thử lại.');
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const isImage = (type: string) => type.includes('images');

  const getAcceptString = () => {
    if (!acceptedTypes || acceptedTypes.length === 0) return '*/*';
    return acceptedTypes.join(',');
  };

  const getAcceptedTypesDisplay = () => {
    if (!acceptedTypes || acceptedTypes.length === 0) return 'Tất cả loại file';
    return acceptedTypes
      .map((type) => {
        if (type.startsWith('.')) return type.toUpperCase();
        if (type.includes('/')) return type.split('/')[1].toUpperCase();
        return type.toUpperCase();
      })
      .join(', ');
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept={getAcceptString()}
        onChange={handleFileSelect}
        className="hidden"
        multiple={allowMultiple}
      />

      {/* Display error */}
      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}

      {/* File Preview/Display */}
      {uploadedFile ? (
        <div className="group relative">
          {/* File Preview Container */}
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-green-300 bg-green-50 p-3">
            {showPreview && isImage(uploadedFile.url) ? (
              <div className="h-28 w-28 overflow-hidden rounded-lg border shadow-sm">
                <Image
                  src={uploadedFile.url.replace('/stores-files', '')}
                  alt="Uploaded file"
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                  onError={() => {
                    setError('Không thể tải ảnh');
                  }}
                />
              </div>
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-blue-100">
                {(() => {
                  const IconComponent = getFileIcon(uploadedFile.type);
                  return <IconComponent className="h-10 w-10 text-blue-600" />;
                })()}
              </div>
            )}
          </div>

          {/* Action Buttons Overlay */}
          <div className="absolute right-2 top-2 flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
            {showPreview && isImage(uploadedFile.url) && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() =>
                  window.open(
                    uploadedFile.url.replace('/stores-files', ''),
                    '_blank'
                  )
                }
                disabled={disabled}
                className="h-8 w-8 bg-white p-2 shadow-md hover:bg-gray-50"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}

            {!value && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={removeFile}
                disabled={disabled || uploading}
                className="h-8 w-8 p-2 shadow-md"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Success indicator */}
          {!value && (
            <div className="mt-2 text-center">
              <span className="inline-flex items-center text-sm font-medium text-green-600">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                File đã được tải lên thành công
              </span>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={!disabled && !uploading ? openFileDialog : undefined}
          className={`
            flex h-32 w-full flex-col items-center justify-center 
            rounded-lg border-2 border-dashed border-gray-300 transition-all duration-200
            ${
              !disabled && !uploading
                ? 'cursor-pointer hover:scale-[1.02] hover:border-blue-400 hover:bg-blue-50'
                : 'cursor-not-allowed opacity-50'
            }
          `}
        >
          <Upload
            className={`mb-3 h-8 w-8 transition-colors ${
              !disabled && !uploading
                ? 'text-gray-400 group-hover:text-blue-500'
                : 'text-gray-300'
            }`}
          />
          <p className="text-center text-sm font-medium text-gray-600">
            {uploading ? 'Đang tải lên...' : 'Nhấn để chọn file'}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {getAcceptedTypesDisplay()} (tối đa {maxSize}MB)
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={openFileDialog}
          disabled={disabled || uploading}
          className="flex-1"
        >
          <Upload className="mr-2 h-4 w-4" />
          {uploading
            ? 'Đang tải lên...'
            : uploadedFile
            ? 'Thay đổi file'
            : 'Chọn file'}
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
