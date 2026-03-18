import React, { useState } from 'react';
import { IMAGES, CATEGORIES } from '../data';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { ParkingWidget } from '../components/widgets/ParkingWidget';
import { ChatbotWidget } from '../components/widgets/ChatbotWidget';
import { AudioguideWidget } from '../components/widgets/AudioguideWidget';
import { Ticker } from '../components/layout/Ticker';

export const TotemPage = () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    return (
        <div className="h-screen w-full bg-app overflow-hidden font-sans text-main">
            <div className="grid grid-cols-12 h-full gap-4 p-6 box-border portrait:grid-rows-12 landscape:grid-rows-[auto_auto_1fr_auto_auto]">

                {/* --- A. Header (Row 1) - CENTRADO --- */}
                <header className="col-span-12 portrait:row-span-1 landscape:row-start-1 flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-main uppercase">
                        Iglesia de Santa Catalina
                    </h1>
                    <p className="text-muted text-lg font-light">Patrimonio Histórico Cultural</p>
                </header>

                {/* --- B. Hero Section (Row 3-8) - TODO EL ANCHO --- */}
                <section className="col-span-12 portrait:row-span-6 landscape:row-start-3 relative group min-h-0 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center gap-4">
                        <div className="h-[90%] w-64 bg-gray-300 rounded-3xl opacity-70 transform scale-95 -translate-x-2 overflow-hidden">
                            <img src={IMAGES.left} className="h-full w-full object-cover" alt="" />
                        </div>

                        <div className="h-full flex-1 rounded-3xl shadow-xl overflow-hidden relative z-10 transform transition hover:scale-[1.01] duration-500">
                            <img src={IMAGES.hero} alt="Main View" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                                <p className="text-white text-xl font-medium">Vista Panorámica Interior</p>
                            </div>
                        </div>

                        <div className="h-[90%] w-64 bg-gray-300 rounded-3xl opacity-70 transform scale-95 translate-x-2 overflow-hidden">
                            <img src={IMAGES.right} className="h-full w-full object-cover" alt="" />
                        </div>
                    </div>
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
        </div>
    );
};
