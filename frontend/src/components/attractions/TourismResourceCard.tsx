import { MapPin, Info } from 'lucide-react';
import type { TourismResource } from '../../types/tourismResources.types';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';
import { getCategoryTranslation } from '../../constants/translations';



/**
 * Propiedades del componente TourismResourceCard.
 */
interface TourismResourceCardProps {
    /** Objeto con la información del recurso turístico a mostrar. */
    tourismResource: TourismResource;
}

/**
 * Tarjeta que muestra el resumen de un recurso turístico (imagen, nombre, categoría, dirección).
 * Incluye un botón para ver más detalles.
 */
export const TourismResourceCard = ({ tourismResource }: TourismResourceCardProps) => {
    return (
        <div className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md border border-gray-100">
            <div className="relative aspect-video overflow-hidden bg-gray-200">
                {tourismResource.media?.images && tourismResource.media.images.length > 0 ? (
                    <img
                        src={`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}/../${tourismResource.media.images[0]}`}
                        alt={tourismResource.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                        <MapPin className="h-12 w-12 opacity-50" />
                    </div>
                )}
                <div className="absolute top-2 right-2 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur-sm">
                    {getCategoryTranslation(tourismResource.category)}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {tourismResource.name}
                </h3>

                <div className="mt-2 flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                    <span className="line-clamp-1">{tourismResource.address}</span>
                </div>

                <p className="mt-3 text-sm text-gray-500 line-clamp-2">
                    {tourismResource.description}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <Link to={`/tourism-resources/${tourismResource.id}`} className="w-full">
                        <Button variant="outline" size="sm" fullWidth icon={<Info className="h-4 w-4" />}>
                            Ver Detalles
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
