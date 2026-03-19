import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { TourismResource } from '../../types/tourismResources.types';
import { Link } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Landmark, Palette, TreePine, UtensilsCrossed, Bed, MapPin } from 'lucide-react';
import { getCategoryTranslation } from '../../constants/translations';

// Custom Map Marker Logic
const getCategoryIconConfig = (category: string) => {
    switch (category) {
        case 'MONUMENT':
            return { icon: <Landmark size={20} color="white" />, outerClass: 'bg-purple-600', pointerClass: 'border-t-purple-600' };
        case 'MUSEUM':
            return { icon: <Palette size={20} color="white" />, outerClass: 'bg-blue-600', pointerClass: 'border-t-blue-600' };
        case 'PARK':
            return { icon: <TreePine size={20} color="white" />, outerClass: 'bg-green-600', pointerClass: 'border-t-green-600' };
        case 'RESTAURANT':
            return { icon: <UtensilsCrossed size={20} color="white" />, outerClass: 'bg-orange-600', pointerClass: 'border-t-orange-600' };
        case 'HOTEL':
            return { icon: <Bed size={20} color="white" />, outerClass: 'bg-cyan-600', pointerClass: 'border-t-cyan-600' };
        case 'OTHER':
        default:
            return { icon: <MapPin size={20} color="white" />, outerClass: 'bg-gray-700', pointerClass: 'border-t-gray-700' };
    }
};

const createCustomIcon = (category: string) => {
    const config = getCategoryIconConfig(category);
    const iconHtml = renderToString(config.icon);
    
    return L.divIcon({
        className: 'custom-div-icon',
        html: `
            <div class="flex flex-col items-center">
                <div class="${config.outerClass} w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white transform transition-transform hover:scale-110 relative z-10">
                    ${iconHtml}
                </div>
                <div class="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent ${config.pointerClass} -mt-[2px] drop-shadow-md relative z-0"></div>
            </div>
        `,
        iconSize: [40, 48],
        iconAnchor: [20, 48],
        popupAnchor: [0, -48]
    });
};

/**
 * Propiedades del componente LeafletMap.
 */
interface MapProps {
    /** Coordenadas [lat, lng] iniciales del centro del mapa. */
    center?: [number, number];
    /** Nivel de zoom inicial. Por defecto 14. */
    zoom?: number;
    /** Lista de recursos turísticos a mostrar como marcadores. */
    markers?: TourismResource[];
    /** Clases CSS adicionales para el contenedor del mapa. */
    className?: string;
}

const MapController = ({ center }: { center?: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center);
        }
    }, [center, map]);
    return null;
};

/**
 * Componente de mapa interactivo usando Leaflet y OpenStreetMap.
 * Permite mostrar marcadores personalizados y centrar el mapa dinámicamente.
 */
export const LeafletMap = ({
    center = [38.3800, -4.8500], // Default Pozoblanco
    zoom = 14,
    markers = [],
    className = "h-[400px] w-full rounded-xl overflow-hidden z-0"
}: MapProps) => {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            className={className}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {markers.map((resource) => (
                <Marker
                    key={resource.id}
                    position={[resource.latitude, resource.longitude]}
                    icon={createCustomIcon(resource.category)}
                >
                    <Popup>
                        <div className="p-1">
                            <h3 className="font-bold text-sm mb-1">{resource.name}</h3>
                            <p className="text-xs text-gray-600 mb-2 font-medium">{getCategoryTranslation(resource.category)}</p>
                            <Link
                                to={`/totem/${resource.id}`}
                                className="text-xs text-primary hover:underline font-medium"
                            >
                                Ver detalles
                            </Link>
                        </div>
                    </Popup>
                </Marker>
            ))}

            <MapController center={center} />
        </MapContainer>
    );
};
