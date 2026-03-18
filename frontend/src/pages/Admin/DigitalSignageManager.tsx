import { useQuery } from '@tanstack/react-query';
import { Monitor, Plus } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { api } from '../../services/api';

interface DigitalSign {
    id: string;
    name: string;
    status: string;
    lastPing: Date;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

const SignageService = {
    getAll: async (): Promise<DigitalSign[]> => {
        const response = await api.get<ApiResponse<DigitalSign[]>>('/digital-signs');
        return response.data.data;
    }
};

export const DigitalSignageManager = () => {
    const { data: screens } = useQuery({
        queryKey: ['screens'],
        queryFn: SignageService.getAll,
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Cartelería Digital</h1>
                <Button icon={<Plus className="h-4 w-4" />}>Nueva Pantalla</Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {screens?.map((screen) => (
                    <div key={screen.id} className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${screen.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                    <Monitor className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{screen.name}</h3>
                                    <div className="text-sm text-gray-500">
                                        {screen.status === 'active' ? 'En línea' : 'Desconectado'}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-gray-400">
                            Última conexión: {screen.lastPing.toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DigitalSignageManager;
