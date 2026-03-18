import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TourismResourceService } from '../services/tourismResources.service';
import { LeafletMap } from '../components/maps/LeafletMap';
import { Button } from '../components/common/Button';
import { Loader2, MapPin, Phone, ArrowLeft } from 'lucide-react';
import { getCategoryTranslation } from '../constants/translations';



export const TourismResourceDetail = () => {
    const { id } = useParams<{ id: string }>();

    const { data: tourismResource, isLoading, error } = useQuery({
        queryKey: ['tourismResource', id],
        queryFn: () => TourismResourceService.getOne(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !tourismResource) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Recurso Turístico no encontrado</h1>
                <Link to="/tourism-resources" className="mt-4 inline-block text-primary hover:underline">
                    &larr; Volver a la lista
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/tourism-resources">
                <Button variant="outline" size="sm" className="mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                </Button>
            </Link>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Left Column: Info */}
                <div>
                    <div className="mb-6">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                            {getCategoryTranslation(tourismResource.category)}
                        </span>
                        <h1 className="mt-2 text-4xl font-bold text-gray-900">{tourismResource.name}</h1>
                        <div className="mt-2 flex items-center text-gray-600">
                            <MapPin className="mr-2 h-5 w-5" />
                            {tourismResource.address}
                        </div>
                        {tourismResource.phone && (
                            <div className="mt-1 flex items-center text-gray-600">
                                <Phone className="mr-2 h-5 w-5" />
                                {tourismResource.phone}
                            </div>
                        )}
                    </div>

                    <div className="prose prose-lg text-gray-700">
                        <p>{tourismResource.description}</p>
                    </div>

                    {tourismResource.media?.images && tourismResource.media.images.length > 0 && (
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            {tourismResource.media.images.map((img: string, idx: number) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`${tourismResource.name} ${idx + 1}`}
                                    className="rounded-lg object-cover shadow-sm h-48 w-full"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Map */}
                <div className="h-[400px] lg:h-[600px] sticky top-24">
                    <LeafletMap
                        center={[tourismResource.latitude, tourismResource.longitude]}
                        zoom={16}
                        markers={[tourismResource]}
                        className="h-full w-full rounded-xl shadow-lg border border-gray-100"
                    />
                </div>
            </div>
        </div>
    );
};

export default TourismResourceDetail;
