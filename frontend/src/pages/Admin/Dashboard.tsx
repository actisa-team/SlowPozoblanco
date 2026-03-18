import { useQuery } from '@tanstack/react-query';
import { TourismResourceService } from '../../services/tourismResources.service';
import { ParkingService } from '../../services/parking.service';
import { api } from '../../services/api';
import { Users, MapPin, Car } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
    </div>
);

export const AdminDashboard = () => {
    const { data: tourismResources } = useQuery({
        queryKey: ['tourismResources'],
        queryFn: TourismResourceService.getAll,
    });

    const { data: parkingStats } = useQuery({
        queryKey: ['parking-stats'],
        queryFn: ParkingService.getStats,
    });

    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await api.get('/users');
            return response.data.data;
        },
    });

    // const { data: signStats } = useQuery({
    //     queryKey: ['digital-signs-stats'],
    //     queryFn: DigitalSignService.getStats,
    // });

    const chartData = {
        labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
        datasets: [
            {
                label: 'Visitas',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.3,
            },
        ],
    };

    const parkingData = {
        labels: ['Libre', 'Ocupado'],
        datasets: [
            {
                data: [parkingStats?.available || 0, parkingStats?.occupied || 0],
                backgroundColor: ['#22c55e', '#ef4444'],
            },
        ],
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Recursos Turísticos"
                    value={tourismResources?.length || 0}
                    icon={MapPin}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Plazas Parking"
                    value={parkingStats?.total || 0}
                    icon={Car}
                    color="bg-green-500"
                />
                <StatCard
                    title="Usuarios"
                    value={users?.length || 0}
                    icon={Users}
                    color="bg-purple-500"
                />
                {/* <StatCard
                    title="Pantallas"
                    value={signStats?.total || 0}
                    icon={Monitor}
                    color="bg-orange-500"
                /> */}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Actividad Semanal</h2>
                    <Line data={chartData} />
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Estado del Parking</h2>
                    <div className="w-64 mx-auto">
                        <Doughnut data={parkingData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
