import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';
import type { User } from '../../types/auth.types';
import { Loader2, Trash2, Edit, Plus } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { ROLE_TRANSLATIONS } from '../../constants/translations';
import { UserFormModal } from '../../components/admin/UserFormModal';
import { toast } from 'react-hot-toast';


interface ApiResponse<T> {
    success: boolean;
    data: T;
}

const UserService = {
    getAll: async (): Promise<User[]> => {
        const response = await api.get<ApiResponse<User[]>>('/users');
        return response.data.data;
    }
};

export const UsersManager = () => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: UserService.getAll,
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/users/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('Usuario eliminado');
        },
        onError: () => {
            toast.error('Error al eliminar usuario');
        }
    });

    const handleDelete = (id: string) => {
        if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
            deleteMutation.mutate(id);
        }
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
                <Button onClick={handleCreate} icon={<Plus className="h-5 w-5" />}>
                    Crear Usuario
                </Button>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Usuario</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Rol</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Estado</th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {users?.map((user) => (
                            <tr key={user.id}>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {user.firstName.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                                        {ROLE_TRANSLATIONS[user.role]}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.isActive ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                    <div className="flex justify-end gap-2">
                                        <Button size="sm" variant="secondary" onClick={() => handleEdit(user)} icon={<Edit className="h-4 w-4" />} />
                                        <Button size="sm" variant="danger" onClick={() => handleDelete(user.id)} icon={<Trash2 className="h-4 w-4" />} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <UserFormModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                user={selectedUser}
                onSuccess={() => queryClient.invalidateQueries({ queryKey: ['users'] })}
            />
        </div>
    );
};

export default UsersManager;
