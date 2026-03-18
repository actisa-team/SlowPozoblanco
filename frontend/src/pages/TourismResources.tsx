import { useQuery } from '@tanstack/react-query';
import { TourismResourceService } from '../services/tourismResources.service';
import { TourismResourceCard } from '../components/attractions/TourismResourceCard';
import { Loader2 } from 'lucide-react';
import { LeafletMap } from '../components/maps/LeafletMap';

export const TourismResources = () => {
    const { data: tourismResources, isLoading, error } = useQuery({
        queryKey: ['tourismResources'],
        queryFn: TourismResourceService.getAll,
    });

    // ... (Loader and Error handling same as before) ...
    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-lg bg-red-50 p-4 text-center text-red-800">
                Ocurrió un error al cargar los recursos turísticos. Por favor intenta más tarde.
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary-dark">Descubre Pozoblanco</h1>
                <p className="mt-2 text-lg text-gray-600">
                    Explora los rincones más emblemáticos del Valle de los Pedroches.
                </p>
            </div>

            <div className="mb-8 border rounded-xl overflow-hidden shadow-sm">
                <LeafletMap markers={tourismResources || []} className="h-[400px] w-full" />
            </div>

            {tourismResources?.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No se encontraron recursos turísticos disponibles.</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {tourismResources?.map((resource) => (
                        <TourismResourceCard key={resource.id} tourismResource={resource} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TourismResources;
