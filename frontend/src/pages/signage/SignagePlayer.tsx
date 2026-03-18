import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TourismResourceService } from '../../services/tourismResources.service';
import { ParkingService } from '../../services/parking.service';
import { MapPin, Car, Cloud, Clock } from 'lucide-react';
import type { TourismResource } from '../../types/tourismResources.types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface SlideProps {
    isActive: boolean;
    children: React.ReactNode;
}

const Slide = ({ isActive, children }: SlideProps) => (
    <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
        {children}
    </div>
);

export const SignagePlayer = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Data Fetching
    const { data: tourismResources } = useQuery({
        queryKey: ['tourismResources'],
        queryFn: TourismResourceService.getAll,
        staleTime: 1000 * 60 * 60 // 1 hour
    });

    const { data: parkingStats } = useQuery({
        queryKey: ['parking-stats'],
        queryFn: ParkingService.getStats,
        refetchInterval: 10000 // 10 seconds
    });

    // Content Rotation Logic
    // Slides: 0 (Intro/Welcome) -> 1..N (TourismResources) -> N+1 (Parking)
    const featuredResources = tourismResources?.slice(0, 3) || [];
    const totalSlides = 1 + featuredResources.length + 1; // Welcome + Resources + Parking

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }, 8000); // 8 seconds per slide
        return () => clearInterval(timer);
    }, [totalSlides]);

    // Clock Update
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const renderResourceSlide = (resource: TourismResource, index: number) => (
        <Slide key={resource.id} isActive={currentIndex === index + 1}>
            <div className="relative h-full w-full">
                <img
                    src={resource.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80'}
                    alt={resource.name}
                    className="h-full w-full object-cover brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 p-16 flex flex-col justify-end">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="bg-primary px-4 py-2 rounded-full text-white font-bold uppercase tracking-wider text-sm">
                            Descubre
                        </span>
                        <div className="flex items-center text-gray-200">
                            <MapPin className="w-5 h-5 mr-2" />
                            {resource.address}
                        </div>
                    </div>
                    <h2 className="text-7xl font-bold text-white mb-6 leading-tight max-w-4xl">
                        {resource.name}
                    </h2>
                    <p className="text-2xl text-gray-200 line-clamp-2 max-w-3xl mb-8">
                        {resource.description}
                    </p>
                    {/* QR Code Placeholder */}
                    <div className="absolute bottom-16 right-16 bg-white p-4 rounded-xl shadow-2xl text-center">
                        <div className="w-32 h-32 bg-gray-900 mb-2" /> {/* Mock QR */}
                        <p className="text-gray-900 font-bold text-sm uppercase">Escanear info</p>
                    </div>
                </div>
            </div>
        </Slide>
    );

    return (
        <div className="h-full w-full bg-gray-900 relative">
            {/* Header / StatusBar */}
            <div className="absolute top-0 left-0 right-0 z-50 p-8 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Slow Pozoblanco</h1>
                </div>
                <div className="flex items-center gap-8 text-white">
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        <Cloud className="w-5 h-5" />
                        <span className="text-xl font-medium">22°C</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        <Clock className="w-5 h-5" />
                        <span className="text-xl font-medium font-mono">
                            {format(currentTime, 'HH:mm', { locale: es })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Slide 0: Welcome */}
            <Slide isActive={currentIndex === 0}>
                <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-black relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="text-center z-10 px-4">
                        <h2 className="text-8xl font-black text-white mb-8 tracking-tighter">
                            Bienvenido a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Pozoblanco
                            </span>
                        </h2>
                        <p className="text-3xl text-gray-300 font-light max-w-2xl mx-auto">
                            Descubre nuestra historia, gastronomía y cultura a tu propio ritmo.
                        </p>
                    </div>
                </div>
            </Slide>

            {/* Tourism Resources Slides */}
            {featuredResources.map((resource, idx) => renderResourceSlide(resource, idx))}

            {/* Slide Last: Parking Status */}
            <Slide isActive={currentIndex === 1 + featuredResources.length}>
                <div className="h-full w-full flex flex-col bg-gray-900 p-16 pt-32">
                    <h2 className="text-5xl font-bold text-white mb-12 flex items-center">
                        <Car className="w-12 h-12 mr-4 text-green-400" />
                        Estado del Aparcamiento
                    </h2>

                    <div className="grid grid-cols-2 gap-12 h-full">
                        {/* Summary Card */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 flex flex-col justify-center items-center text-center backdrop-blur-sm">
                            <span className="text-gray-400 text-2xl uppercase tracking-widest mb-4">Plazas Libres</span>
                            <span className="text-9xl font-black text-green-400 mb-4">
                                {parkingStats?.available || 0}
                            </span>
                            <span className="text-gray-400 text-xl">
                                de {parkingStats?.total || 0} plazas totales
                            </span>
                        </div>

                        {/* Zone List (Mocked for visual if no zone data in stats yet) */}
                        <div className="space-y-6">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Zona Centro (A)</h3>
                                    <p className="text-green-400 mt-1">Alta disponibilidad</p>
                                </div>
                                <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-2xl">
                                    {(parkingStats?.available || 0) > 0 ? 'OK' : 'LLENO'}
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Zona Norte (B)</h3>
                                    <p className="text-yellow-400 mt-1">Ocupación media</p>
                                </div>
                                <div className="h-16 w-16 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-2xl">
                                    50%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Slide>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-linear"
                style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
            />
        </div>
    );
};

export default SignagePlayer;
