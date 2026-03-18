import { useQuery } from '@tanstack/react-query';
import { ParkingService } from '../services/parking.service';
import { Loader2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons for status
const freeIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #22c55e; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
});

const occupiedIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #ef4444; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
});

export const Parking = () => {
    // Poll every 10 seconds for real-time updates
    const { data: spaces, isLoading } = useQuery({
        queryKey: ['parking-spaces'],
        queryFn: ParkingService.getAll,
        refetchInterval: 10000
    });

    const { data: stats } = useQuery({
        queryKey: ['parking-stats'],
        queryFn: ParkingService.getStats,
        refetchInterval: 10000
    });

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary-dark">Aparcamiento Inteligente</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Consulta la disponibilidad de plazas en tiempo real.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="flex gap-4">
                    <div className="rounded-lg bg-green-50 px-4 py-2 text-center border border-green-100">
                        <span className="block text-2xl font-bold text-green-700">{stats?.available ?? '-'}</span>
                        <span className="text-xs font-medium text-green-800 uppercase">Libres</span>
                    </div>
                    <div className="rounded-lg bg-red-50 px-4 py-2 text-center border border-red-100">
                        <span className="block text-2xl font-bold text-red-700">{stats?.occupied ?? '-'}</span>
                        <span className="text-xs font-medium text-red-800 uppercase">Ocupadas</span>
                    </div>
                </div>
            </div>

            <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-100 z-0">
                <MapContainer
                    center={[38.3800, -4.8500]}
                    zoom={16}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {spaces?.map((space) => (
                        <Marker
                            key={space.id}
                            position={[space.latitude, space.longitude]}
                            icon={space.isOccupied ? occupiedIcon : freeIcon}
                        >
                            <Popup>
                                <div className="p-1">
                                    <h3 className="font-bold text-sm mb-1">Plaza {space.spaceNumber}</h3>
                                    <p className="text-xs text-gray-600 mb-1">Zona: {space.zone}</p>
                                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white ${space.isOccupied ? 'bg-red-500' : 'bg-green-500'}`}>
                                        {space.isOccupied ? 'OCUPADA' : 'LIBRE'}
                                    </span>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                <div className="absolute bottom-4 left-4 z-[400] bg-white p-3 rounded-lg shadow-md flex flex-col gap-2 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>
                        <span>Libre</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow-sm"></div>
                        <span>Ocupada</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Parking;
