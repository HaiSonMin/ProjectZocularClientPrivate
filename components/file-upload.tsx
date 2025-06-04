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
  Eye,
  Trash2
} from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import { toast } from './ui/use-toast';

// Generic type to handle dynamic typing
interface FileUploadSingleProps {
  maxFiles: 1;
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  maxSize?: number;
  acceptedTypes?: string[];
  showPreview?: boolean;
  allowMultiple?: boolean;
}

interface FileUploadMultipleProps {
  maxFiles?: number; // > 1 or undefined (default 10)
  value?: string[];
  onChange: (urls: string[]) => void;
  disabled?: boolean;
  maxSize?: number;
  acceptedTypes?: string[];
  showPreview?: boolean;
  allowMultiple?: boolean;
}

type FileUploadProps = FileUploadSingleProps | FileUploadMultipleProps;

const FileUpload: React.FC<FileUploadProps> = (props) => {
  const {
    disabled = false,
    maxSize = 50,
    acceptedTypes,
    showPreview = true,
    allowMultiple = true,
    maxFiles = 10
  } = props;

  // Determine if single or multiple mode
  const isSingleMode = maxFiles === 1;

  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<IFileUploadResponse[]>([]);
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

  const getValueAsArray = useCallback((): string[] => {
    if (isSingleMode) {
      const singleValue = (props as FileUploadSingleProps).value;
      return singleValue ? [singleValue] : [];
    } else {
      const multiValue = (props as FileUploadMultipleProps).value;
      return multiValue || [];
    }
  }, [isSingleMode, props]);

  // Helper function to call onChange with correct type
  const callOnChange = (urls: string[]) => {
    if (isSingleMode) {
      const singleOnChange = (props as FileUploadSingleProps).onChange;
      singleOnChange(urls[0] || '');
    } else {
      const multiOnChange = (props as FileUploadMultipleProps).onChange;
      multiOnChange(urls);
    }
  };

  useEffect(() => {
    const currentValues = getValueAsArray();

    if (currentValues.length > 0 && uploadedFiles.length === 0) {
      const mockFiles: IFileUploadResponse[] = currentValues.map(
        (url, index) => ({
          id: `existing-${index}`,
          url: url,
          name: url.split('/').pop() || '',
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
        })
      );
      setUploadedFiles(mockFiles);
    }
  }, [props.value, uploadedFiles.length, isSingleMode, getValueAsArray]);

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
        return `Unsupported file type. Only accept: ${acceptedTypes.join(
          ', '
        )}`;
      }
    }

    if (file.size > maxSize * 1024 * 1024) {
      return `File must not exceed ${maxSize}MB`;
    }

    return null;
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError(null);
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // In single mode, only take the first file
    const filesToProcess = isSingleMode ? [files[0]] : Array.from(files);

    // Check maximum number of files
    if (
      !isSingleMode &&
      uploadedFiles.length + filesToProcess.length > maxFiles
    ) {
      setError(`You can only upload up to ${maxFiles} files`);
      return;
    }

    let hasError = false;

    // Validate all files before uploading
    for (const file of filesToProcess) {
      const errorMsg = validateFile(file);
      if (errorMsg) {
        setError(errorMsg);
        hasError = true;
        break;
      }
    }

    if (hasError) return;

    try {
      setUploading(true);

      if (isSingleMode) {
        // Single mode: replace existing file
        const fileResponse = await uploadFile(filesToProcess[0]);
        setUploadedFiles([fileResponse]);
        callOnChange([fileResponse.url.replace('/stores-files', '')]);

        toast({
          title: 'Success',
          description: 'File uploaded successfully'
        });
      } else {
        // Multiple mode: add to existing files
        const uploadPromises = filesToProcess.map(async (file) => {
          const fileResponse = await uploadFile(file);
          return fileResponse;
        });

        const uploadResults = await Promise.all(uploadPromises);

        const newUploadedFiles = [...uploadedFiles, ...uploadResults];
        setUploadedFiles(newUploadedFiles);

        const urls = newUploadedFiles.map((file) =>
          file.url.replace('/stores-files', '')
        );
        callOnChange(urls);

        toast({
          title: 'Success',
          description: `${uploadResults.length} files uploaded successfully`
        });
      }
    } catch (error) {
      setError('File upload failed. Please try again.');
    } finally {
      setUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeFile = async (index: number) => {
    try {
      const fileToRemove = uploadedFiles[index];

      if (fileToRemove?.id && !fileToRemove.id.startsWith('existing-')) {
        await deleteFile(fileToRemove.id);
      }

      const newUploadedFiles = uploadedFiles.filter((_, i) => i !== index);
      setUploadedFiles(newUploadedFiles);

      const urls = newUploadedFiles.map((file) =>
        file.url.replace('/stores-files', '')
      );
      callOnChange(urls);

      toast({
        title: 'Success',
        description: 'File deleted successfully'
      });
    } catch (error) {
      setError('File deletion failed. Please try again.');
    }
  };

  const removeAllFiles = async () => {
    try {
      const deletePromises = uploadedFiles
        .filter((file) => file.id && !file.id.startsWith('existing-'))
        .map((file) => deleteFile(file.id));

      await Promise.all(deletePromises);

      setUploadedFiles([]);
      callOnChange([]);
      setError(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      toast({
        title: 'Success',
        description: 'All files deleted successfully'
      });
    } catch (error) {
      setError('File deletion failed. Please try again.');
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const isImage = (url: string) => {
    return url.includes('images') || /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  const getAcceptString = () => {
    if (!acceptedTypes || acceptedTypes.length === 0) return '*/*';
    return acceptedTypes.join(',');
  };

  const getAcceptedTypesDisplay = () => {
    if (!acceptedTypes || acceptedTypes.length === 0) return 'All file types';
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
        multiple={!isSingleMode && allowMultiple}
      />

      {/* Display error */}
      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}

      {/* Files Display */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          {/* Header - only shown in multiple mode */}
          {!isSingleMode && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Uploaded {uploadedFiles.length}/{maxFiles} files
              </span>
              {uploadedFiles.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={removeAllFiles}
                  disabled={disabled || uploading}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete all
                </Button>
              )}
            </div>
          )}

          {/* Files Grid */}
          <div
            className={`
            ${
              isSingleMode
                ? 'flex justify-center'
                : 'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'
            }
          `}
          >
            {uploadedFiles.map((file, index) => (
              <div key={`${file.id}-${index}`} className="group relative">
                {/* File Preview Container */}
                <div
                  className={`
                  flex items-center justify-center rounded-lg border-2 border-dashed border-green-300 bg-green-50
                  ${isSingleMode ? 'p-3' : 'p-2'}
                `}
                >
                  {showPreview && isImage(file.url) ? (
                    <div
                      className={`
                      overflow-hidden rounded-lg border shadow-sm
                      ${isSingleMode ? 'h-28 w-28' : 'h-20 w-20'}
                    `}
                    >
                      <Image
                        src={file.url.replace('/stores-files', '')}
                        alt={file.name || 'Uploaded file'}
                        width={isSingleMode ? 112 : 80}
                        height={isSingleMode ? 112 : 80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className={`
                      flex items-center justify-center rounded-lg bg-blue-100
                      ${isSingleMode ? 'h-20 w-20' : 'h-16 w-16'}
                    `}
                    >
                      {(() => {
                        const IconComponent = getFileIcon(file.type);
                        return (
                          <IconComponent
                            className={`text-blue-600 ${
                              isSingleMode ? 'h-10 w-10' : 'h-8 w-8'
                            }`}
                          />
                        );
                      })()}
                    </div>
                  )}
                </div>

                {/* Action Buttons Overlay */}
                <div
                  className={`
                  absolute flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100
                  ${isSingleMode ? 'right-2 top-2' : 'right-1 top-1'}
                `}
                >
                  {showPreview && isImage(file.url) && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        window.open(
                          file.url.replace('/stores-files', ''),
                          '_blank'
                        )
                      }
                      disabled={disabled}
                      className={`
                        bg-white shadow-md hover:bg-gray-50
                        ${isSingleMode ? 'h-8 w-8 p-2' : 'h-6 w-6 p-1'}
                      `}
                    >
                      <Eye className={isSingleMode ? 'h-4 w-4' : 'h-3 w-3'} />
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFile(index)}
                    disabled={disabled || uploading}
                    className={`
                      shadow-md
                      ${isSingleMode ? 'h-8 w-8 p-2' : 'h-6 w-6 p-1'}
                    `}
                  >
                    <X className={isSingleMode ? 'h-4 w-4' : 'h-3 w-3'} />
                  </Button>
                </div>

                {/* File name */}
                {file.name && (
                  <div className="mt-1 text-center">
                    <p
                      className="truncate text-xs text-gray-600"
                      title={file.name}
                    >
                      {file.name}
                    </p>
                  </div>
                )}

                {/* Success indicator - only in single mode */}
                {isSingleMode && (
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
                      File uploaded successfully.
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Area - displayed when no files (single mode) or not reached maxFiles (multiple mode) */}
      {(isSingleMode
        ? uploadedFiles.length === 0
        : uploadedFiles.length < maxFiles) && (
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
            className={`
              mb-3 h-8 w-8 transition-colors ${
                !disabled && !uploading
                  ? 'text-gray-400 group-hover:text-blue-500'
                  : 'text-gray-300'
              }
            `}
          />
          <p className="text-center text-sm font-medium text-gray-600">
            {uploading
              ? 'Uploading...'
              : isSingleMode
              ? 'Click to select file'
              : allowMultiple
              ? 'Click to select files'
              : 'Click to select file'}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {getAcceptedTypesDisplay()} (max {maxSize}MB per file)
          </p>
          {!isSingleMode && (
            <p className="text-xs text-gray-400">
              Remaining: {maxFiles - uploadedFiles.length} files
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={openFileDialog}
          disabled={
            disabled ||
            uploading ||
            (isSingleMode ? false : uploadedFiles.length >= maxFiles)
          }
          className="flex-1"
        >
          <Upload className="mr-2 h-4 w-4" />
          {uploading
            ? 'Uploading...'
            : isSingleMode
            ? uploadedFiles.length > 0
              ? 'Change file'
              : 'Select file'
            : uploadedFiles.length > 0
            ? 'Add files'
            : allowMultiple
            ? 'Select files'
            : 'Select file'}
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
