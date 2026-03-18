import React, { useRef, useState } from 'react';
import { X, File, Image as ImageIcon, Video, Eye } from 'lucide-react';
import { MediaPreviewModal } from './MediaPreviewModal';

// Export MediaType separately to ensure proper module resolution
export type MediaType = 'images' | 'images360' | 'videos' | 'videos360';

interface MediaUploadProps {
    label: string;
    mediaType: MediaType;
    files: File[];
    onChange: (files: File[]) => void;
    maxFiles?: number;
    accept?: string;
    helperText?: string;
    initialFiles?: string[];
    onRemoveInitial?: (filename: string) => void;
}

const mediaConfig = {
    images: {
        icon: ImageIcon,
        accept: 'image/jpeg,image/jpg,image/png,image/webp',
        maxSize: 5 * 1024 * 1024, // 5MB
        maxFiles: 5,
    },
    images360: {
        icon: ImageIcon,
        accept: 'image/jpeg,image/jpg,image/png,image/webp',
        maxSize: 50 * 1024 * 1024, // 50MB
        maxFiles: 5,
    },
    videos: {
        icon: Video,
        accept: 'video/mp4,video/webm',
        maxSize: 1024 * 1024 * 1024, // 1GB
        maxFiles: 2,
    },
    videos360: {
        icon: Video,
        accept: 'video/mp4,video/webm',
        maxSize: 1024 * 1024 * 1024, // 1GB
        maxFiles: 1,
    },
};

/**
 * Component for uploading media files with drag & drop support.
 */
export const MediaUpload: React.FC<MediaUploadProps> = ({
    label,
    mediaType,
    files,
    onChange,
    maxFiles,
    accept,
    helperText,
    initialFiles = [],
    onRemoveInitial,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string>('');
    const [remoteFiles, setRemoteFiles] = useState<string[]>(initialFiles);

    // Preview state
    const [previewFile, setPreviewFile] = useState<{ url: string; filename: string; type: 'image' | 'image360' | 'video' | 'video360' } | null>(null);

    // Update remote files when prop changes
    React.useEffect(() => {
        setRemoteFiles(initialFiles);
    }, [initialFiles]);

    const config = mediaConfig[mediaType];
    const maxAllowed = maxFiles || config.maxFiles;
    const acceptedTypes = accept || config.accept;
    const Icon = config.icon;

    const validateFile = (file: File): string | null => {
        if (file.size > config.maxSize) {
            const maxMB = config.maxSize / (1024 * 1024);
            return `El archivo "${file.name}" excede el tamaño máximo de ${maxMB}MB`;
        }

        const acceptedMimeTypes = acceptedTypes.split(',');
        if (!acceptedMimeTypes.includes(file.type)) {
            return `Tipo de archivo no permitido: ${file.type}`;
        }

        return null;
    };

    const handleRemoteRemove = (filename: string) => {
        if (onRemoveInitial) {
            onRemoveInitial(filename);
            // Optimistically update UI
            setRemoteFiles(prev => prev.filter(f => !f.endsWith(filename)));
        }
    };

    const handleFiles = (newFiles: FileList | null) => {
        if (!newFiles) return;

        const filesArray = Array.from(newFiles);

        if (files.length + filesArray.length > maxAllowed) {
            setError(`Máximo ${maxAllowed} archivos permitidos`);
            return;
        }

        // Validate each file
        for (const file of filesArray) {
            const validationError = validateFile(file);
            if (validationError) {
                setError(validationError);
                return;
            }
        }

        setError('');
        onChange([...files, ...filesArray]);
    };

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        onChange(newFiles);
        setError('');
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-secondary">
                {label}
            </label>

            {/* Drop Zone */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`
                    relative border-2 border-dashed rounded-lg p-6 
                    text-center cursor-pointer transition-colors
                    ${isDragging
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                    }
                `}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={acceptedTypes}
                    multiple={maxAllowed > 1}
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                />

                <Icon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                    Arrastra archivos aquí o haz clic para seleccionar
                </p>
                <p className="mt-1 text-xs text-gray-500">
                    {helperText || `Máx. ${maxAllowed} archivos, ${config.maxSize / (1024 * 1024)}MB cada uno`}
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-xs text-error font-medium">{error}</p>
            )}

            {/* Existing (Remote) Files List */}
            {remoteFiles.length > 0 && (
                <div className="space-y-2 mb-2">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Archivos Existentes</p>
                    {remoteFiles.map((url, index) => {
                        const filename = url.split('/').pop() || 'Archivo desconocido';
                        // Fix URL if relative
                        let baseUrl = 'http://localhost:3000';
                        try {
                            if (import.meta.env.VITE_API_URL) {
                                baseUrl = new URL(import.meta.env.VITE_API_URL).origin;
                            }
                        } catch (e) {
                            console.warn('Invalid VITE_API_URL', e);
                        }

                        const fullUrl = url.startsWith('http') || url.startsWith('blob:')
                            ? url
                            : `${baseUrl}/${url.replace(/^\//, '')}`;

                        console.log('MediaUpload Debug:', { url, baseUrl, fullUrl });

                        let previewType: 'image' | 'video' | 'image360' | 'video360';
                        if (mediaType === 'images360') previewType = 'image360';
                        else if (mediaType === 'videos360') previewType = 'video360';
                        else if (mediaType === 'videos') previewType = 'video';
                        else previewType = 'image';

                        return (
                            <div
                                key={`remote-${index}`}
                                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md"
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer group" onClick={() => setPreviewFile({ url: fullUrl, filename, type: previewType })}>
                                    {/* Preview logic */}
                                    {mediaType === 'images' || mediaType === 'images360' ? (
                                        <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-100 overflow-hidden relative border border-gray-200">
                                            <img
                                                src={fullUrl}
                                                alt={filename}
                                                className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                                <Eye className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 drop-shadow-md" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded bg-blue-50 text-blue-500 group-hover:bg-blue-100 transition-colors">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                    )}

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-900 truncate group-hover:text-primary transition-colors">
                                                {filename}
                                            </span>
                                        </div>
                                        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                            Subido
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoteRemove(filename);
                                    }}
                                    className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 ml-2 group"
                                    type="button"
                                    title="Eliminar archivo existente"
                                >
                                    <X className="h-5 w-5 transition-transform group-hover:scale-110" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* New Files List */}
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.length > 0 && remoteFiles.length > 0 && (
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-4">Nuevos Archivos</p>
                    )}
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <File className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatFileSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFile(index)}
                                className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
                                type="button"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* File Counter */}
            <p className="text-xs text-gray-500">
                {remoteFiles.length + files.length} de {maxAllowed} archivos (Total)
            </p>

            {previewFile && (
                <MediaPreviewModal
                    isOpen={!!previewFile}
                    onClose={() => setPreviewFile(null)}
                    url={previewFile.url}
                    type={previewFile.type}
                    filename={previewFile.filename}
                />
            )}
        </div>
    );
};
