import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TourismResourceService } from '../services/tourismResources.service';
import { IMAGES, CATEGORIES } from '../data';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { ParkingWidget } from '../components/widgets/ParkingWidget';
import { ChatbotWidget } from '../components/widgets/ChatbotWidget';
import { AudioguideWidget } from '../components/widgets/AudioguideWidget';
import { Ticker } from '../components/layout/Ticker';
import { ChevronLeft, ChevronRight, Loader2, Maximize2 } from 'lucide-react';
import { MediaPreviewModal } from '../components/common/MediaPreviewModal';

export const TotemPage = () => {
    const { id } = useParams<{ id: string }>();
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previewMedia, setPreviewMedia] = useState<{ url: string, type: string } | null>(null);

    const { data: resource, isLoading } = useQuery({
        queryKey: ['totem-resource', id],
        queryFn: () => TourismResourceService.getOne(id!),
        enabled: !!id
    });

    const allMedia = useMemo(() => {
        if (!resource?.media) return [];
        const { images = [], images360 = [], videos = [], videos360 = [] } = resource.media;
        return [
            ...images.map(url => ({ type: 'image', url })),
            ...images360.map(url => ({ type: 'image360', url })),
            ...videos.map(url => ({ type: 'video', url })),
            ...videos360.map(url => ({ type: 'video360', url }))
        ];
    }, [resource?.media]);

    const getMediaUrl = (path: string) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const base = import.meta.env.VITE_API_URL?.replace(/\/api\/v1\/?$/, '')?.replace(/\/v1\/?$/, '') || 'http://localhost:3000';
        return `${base}/${path}`;
    };

    const handleNext = () => {
        if (allMedia.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % allMedia.length);
        }
    };

    const handlePrev = () => {
        if (allMedia.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
        }
    };

    const prevIndex = allMedia.length > 0 ? (currentIndex - 1 + allMedia.length) % allMedia.length : 0;
    const nextIndex = allMedia.length > 0 ? (currentIndex + 1) % allMedia.length : 0;

    const renderMedia = (mediaItem: { type: string, url: string } | undefined, className: string) => {
        if (!mediaItem) return <div className={`bg-gray-200 ${className}`} />;
        
        const fullUrl = getMediaUrl(mediaItem.url);
        
        if (mediaItem.type.includes('video')) {
            return (
                <video 
                    src={fullUrl} 
                    className={className} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    style={{ objectFit: 'cover' }}
                />
            );
        }
        
        return <img src={fullUrl} className={className} alt="" style={{ objectFit: 'cover' }} />;
    };

    if (isLoading) {
        return (
            <div className="h-screen w-full bg-app flex items-center justify-center font-sans">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-app overflow-hidden font-sans text-main">
            <div className="grid grid-cols-12 h-full gap-4 p-6 box-border portrait:grid-rows-12 landscape:grid-rows-[auto_auto_1fr_auto_auto]">

                {/* --- A. Header (Row 1) - CENTRADO --- */}
                <header className="col-span-12 portrait:row-span-1 landscape:row-start-1 flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-main uppercase">
                        {resource?.name || 'Cargando...'}
                    </h1>
                    <p className="text-muted text-lg font-light line-clamp-2 max-w-4xl px-4">
                        {resource?.description || 'Recurso Turístico'}
                    </p>
                </header>

                {/* --- B. Hero Section (Row 3-8) - TODO EL ANCHO --- */}
                <section className="col-span-12 portrait:row-span-6 landscape:row-start-3 relative group min-h-0 overflow-hidden">
                    {allMedia.length > 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center gap-4">
                            {/* Previous Item */}
                            <div 
                                className="h-[90%] w-64 bg-gray-300 rounded-3xl opacity-70 transform scale-95 -translate-x-2 overflow-hidden cursor-pointer hover:opacity-100 transition-opacity"
                                onClick={handlePrev}
                            >
                                {renderMedia(allMedia[prevIndex], "h-full w-full object-cover")}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                                    <ChevronLeft className="w-12 h-12 text-white/50" />
                                </div>
                            </div>

                            {/* Current Item */}
                            <div 
                                className="h-full flex-1 rounded-3xl shadow-xl overflow-hidden relative z-10 transform transition hover:scale-[1.01] duration-500 cursor-pointer group/current"
                                onClick={() => setPreviewMedia(allMedia[currentIndex])}
                            >
                                {renderMedia(allMedia[currentIndex], "w-full h-full object-cover")}
                                
                                <div className="absolute inset-0 bg-black/0 group-hover/current:bg-black/10 flex items-center justify-center transition-colors">
                                    <div className="bg-black/50 p-4 rounded-full opacity-0 group-hover/current:opacity-100 transform scale-75 group-hover/current:scale-100 transition-all duration-300 backdrop-blur-sm">
                                        <Maximize2 className="w-8 h-8 text-white" />
                                    </div>
                                </div>

                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex justify-between items-end">
                                    <p className="text-white text-xl font-medium drop-shadow-md">
                                        {currentIndex + 1} / {allMedia.length}
                                    </p>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handlePrev(); }} 
                                            className="bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm transition-colors cursor-pointer z-20"
                                        >
                                            <ChevronLeft className="w-6 h-6 text-white" />
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleNext(); }} 
                                            className="bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm transition-colors cursor-pointer z-20"
                                        >
                                            <ChevronRight className="w-6 h-6 text-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Next Item */}
                            <div 
                                className="h-[90%] w-64 bg-gray-300 rounded-3xl opacity-70 transform scale-95 translate-x-2 overflow-hidden cursor-pointer hover:opacity-100 transition-opacity"
                                onClick={handleNext}
                            >
                                {renderMedia(allMedia[nextIndex], "h-full w-full object-cover")}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                                    <ChevronRight className="w-12 h-12 text-white/50" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/50 rounded-3xl border border-gray-200">
                            <p className="text-gray-500 text-lg">No hay imágenes o vídeos disponibles</p>
                        </div>
                    )}
                </section>

                {/* --- Audioguía + PoiDots (Row 2) --- */}
                <div className="col-span-9 portrait:row-span-1 landscape:row-start-2">
                    <div className="flex items-center gap-4 px-4 h-full landscape:h-24">
                        {IMAGES.dots.map((src, i) => (
                            <div key={i} className="h-full aspect-square rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0">
                                <img src={src} alt="" className="h-full w-full object-cover" />
                            </div>
                        ))}
                        <div className="h-[1px] bg-muted/20 flex-1 ml-4" />
                    </div>
                </div>

                <div className="col-span-3 portrait:row-span-1 landscape:row-start-2">
                    <AudioguideWidget />
                </div>



                {/* --- D. Categories (Row 9-11, Col 1-9) --- */}
                <div className="col-span-9 portrait:row-span-3 landscape:row-start-4 grid grid-cols-3 gap-4">
                    {CATEGORIES.map((cat) => (
                        <Card
                            key={cat.id}
                            className="relative overflow-hidden group p-0 cursor-pointer active:scale-95 transition-transform"
                            onClick={() => setActiveModal(cat.label)}
                        >
                            <img src={cat.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={cat.label} />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                            <div className="absolute bottom-0 left-0 p-4">
                                <h3 className="text-white font-bold text-xl">{cat.label}</h3>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* --- Parking + Chatbot (Row 9-11, Col 10-12) --- */}
                <div className="col-span-3 portrait:row-span-3 landscape:row-start-4 flex flex-col gap-4 landscape:flex-row">
                    <div className="flex-1">
                        <ParkingWidget />
                    </div>
                    <div className="flex-1">
                        <ChatbotWidget />
                    </div>
                </div>

                {/* --- F. Footer --- */}
                <footer className="col-span-12 portrait:row-span-1 landscape:row-start-5 -mx-6 -mb-6 mt-2">
                    <Ticker />
                </footer>

            </div>

            <Modal
                isOpen={!!activeModal}
                onClose={() => setActiveModal(null)}
                title={activeModal || ''}
            />

            {previewMedia && (
                <MediaPreviewModal
                    isOpen={!!previewMedia}
                    onClose={() => setPreviewMedia(null)}
                    url={getMediaUrl(previewMedia.url)}
                    type={previewMedia.type as 'image' | 'image360' | 'video' | 'video360'}
                    filename={resource?.name ? `${resource.name} - Multimedia ${currentIndex + 1}` : 'Vista Multimedia'}
                />
            )}
        </div>
    );
};
