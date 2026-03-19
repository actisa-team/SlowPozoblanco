import React from 'react';
import { X } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../common/Button';
import { MediaViewer360 } from './MediaViewer360';

interface MediaPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    type: 'image' | 'image360' | 'video' | 'video360';
    filename: string;
}

export const MediaPreviewModal = ({ isOpen, onClose, url, type, filename }: MediaPreviewModalProps) => {
    const is360 = type === 'image360' || type === 'video360';

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={filename}
            maxWidth="full"
        >
            <div className="flex flex-col h-full bg-black/5 rounded-lg overflow-hidden">
                <div className="flex-1 flex items-center justify-center p-4 min-h-[75vh] max-h-[85vh]">
                    {is360 ? (
                        <MediaViewer360 url={url} type={type as 'image360' | 'video360'} />
                    ) : type === 'image' ? (
                        <img
                            src={url}
                            alt={filename}
                            className="max-w-full max-h-full object-contain rounded-md shadow-lg"
                        />
                    ) : (
                        <video
                            src={url}
                            controls
                            className="max-w-full max-h-full rounded-md shadow-lg"
                        >
                            Tu navegador no soporta el elemento de video.
                        </video>
                    )}
                </div>

                <div className="flex justify-end p-4 border-t border-gray-200 bg-white">
                    <Button variant="secondary" onClick={onClose}>
                        Cerrar
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
