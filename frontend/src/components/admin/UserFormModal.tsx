import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal } from '../ui/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { api } from '../../services/api';
import { toast } from 'react-hot-toast';
import type { User } from '../../types/auth.types';
import { UserRole } from '../../types/auth.types';
import { ROLE_TRANSLATIONS } from '../../constants/translations';

const userSchema = z.object({
    firstName: z.string().min(2, 'Mínimo 2 caracteres'),
    lastName: z.string().min(2, 'Mínimo 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'Mínimo 8 caracteres').optional().or(z.literal('')),
    role: z.enum([UserRole.ADMIN, UserRole.MANAGER, UserRole.USER]),
    isActive: z.boolean(),
    phone: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
    age: z.string().optional(),
    gender: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    user?: User | null;
    onSuccess: () => void;
}

export const UserFormModal = ({ isOpen, onClose, user, onSuccess }: UserFormModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = !!user;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            role: user?.role || UserRole.USER,
            isActive: user?.isActive ?? true,
            phone: user?.phone || '',
            country: user?.country || '',
            postalCode: user?.postalCode || '',
            age: user?.age ? String(user.age) : '',
            gender: user?.gender || '',
        }
    });

    // Reset form when user changes
    useState(() => {
        if (isOpen) {
            reset({
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                email: user?.email || '',
                role: user?.role || UserRole.USER,
                isActive: user?.isActive ?? true,
                phone: user?.phone || '',
                country: user?.country || '',
                postalCode: user?.postalCode || '',
                age: user?.age ? String(user.age) : '',
                gender: user?.gender || '',
            });
        }
    });

    const onSubmit = async (data: UserFormData) => {
        try {
            setIsLoading(true);
            const payload = {
                ...data,
                age: data.age ? parseInt(data.age, 10) : undefined,
                // Only send password if creating or if provided during edit
                ...(data.password ? { password: data.password } : {}),
            };

            // Requirement: Password is required for creation
            if (!isEditing && !payload.password) {
                toast.error('La contraseña es obligatoria para nuevos usuarios');
                return;
            }

            if (isEditing) {
                await api.put(`/users/${user.id}`, payload);
                toast.success('Usuario actualizado');
            } else {
                await api.post('/auth/register', { ...payload, password: payload.password! });
                toast.success('Usuario creado');
            }
            onSuccess();
            onClose();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Error al guardar el usuario');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditing ? 'Editar Usuario' : 'Crear Usuario'}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Nombre" {...register('firstName')} error={errors.firstName} />
                    <Input label="Apellidos" {...register('lastName')} error={errors.lastName} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input label="Email" type="email" {...register('email')} error={errors.email} />
                    <Input 
                        label={isEditing ? "Contraseña (déjalo vacío para no cambiar)" : "Contraseña"} 
                        type="password" 
                        {...register('password')} 
                        error={errors.password} 
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input label="Teléfono" {...register('phone')} error={errors.phone} />
                    <Input label="País" {...register('country')} error={errors.country} />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <Input label="C. Postal" {...register('postalCode')} error={errors.postalCode} />
                    <Input label="Edad" type="number" {...register('age')} error={errors.age} />
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Sexo</label>
                        <select {...register('gender')} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                            <option value="">Ninguno...</option>
                            <option value="F">Femenino</option>
                            <option value="M">Masculino</option>
                            <option value="OTHER">Otro</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Rol</label>
                        <select {...register('role')} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                            {Object.entries(UserRole).map(([, value]) => (
                                <option key={value} value={value}>
                                    {ROLE_TRANSLATIONS[value]}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                        <input type="checkbox" id="isActive" {...register('isActive')} className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary" />
                        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Usuario Activo</label>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <Button type="button" onClick={onClose}>Cancelar</Button>
                    <Button type="submit" disabled={isLoading}>{isEditing ? 'Guardar Cambios' : 'Crear Usuario'}</Button>
                </div>
            </form>
        </Modal>
    );
};
