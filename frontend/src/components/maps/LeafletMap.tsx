import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import type { TourismResource } from '../../types/tourismResources.types';
import { Link } from 'react-router-dom';

// Fix for default Leaflet markers not showing
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = new Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

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
                    icon={DefaultIcon}
                >
                    <Popup>
                        <div className="p-1">
                            <h3 className="font-bold text-sm mb-1">{resource.name}</h3>
                            <p className="text-xs text-gray-600 mb-2">{resource.category}</p>
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
