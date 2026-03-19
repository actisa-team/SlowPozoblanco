import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { AuthService } from '../../services/auth.service';
import { toast } from 'react-hot-toast';

const registerSchema = z.object({
    firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    lastName: z.string().min(2, 'Los apellidos deben tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    phone: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
    age: z.string().refine(val => !val || parseInt(val, 10) >= 0, { message: 'La edad no puede ser negativa' }).optional(), // captured as string, transformed before submit
    gender: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            setIsLoading(true);
            const payload = {
                ...data,
                age: data.age ? parseInt(data.age, 10) : undefined,
            };
            
            await AuthService.register(payload);
            toast.success('Registro completado. ¡Inicia sesión!');
            navigate('/login');
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Error al registrar el usuario');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Nombre"
                    {...register('firstName')}
                    error={errors.firstName}
                />
                <Input
                    label="Apellidos"
                    {...register('lastName')}
                    error={errors.lastName}
                />
            </div>
            
            <Input
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email}
            />
            
            <Input
                label="Contraseña"
                type="password"
                {...register('password')}
                error={errors.password}
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Teléfono (Opcional)"
                    {...register('phone')}
                    error={errors.phone}
                />
                <Input
                    label="País (Opcional)"
                    {...register('country')}
                    error={errors.country}
                />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <Input
                    label="C. Postal (Opcional)"
                    {...register('postalCode')}
                    error={errors.postalCode}
                />
                <Input
                    label="Edad (Opcional)"
                    type="number"
                    min="0"
                    {...register('age')}
                    error={errors.age}
                />
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Sexo (Opcional)</label>
                    <select
                        {...register('gender')}
                        className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                    >
                        <option value="">Selecciona...</option>
                        <option value="F">Femenino</option>
                        <option value="M">Masculino</option>
                        <option value="OTHER">Otro</option>
                    </select>
                </div>
            </div>

            <Button type="submit" fullWidth disabled={isLoading}>
                {isLoading ? 'Registrando...' : 'Registrarse'}
            </Button>

            <div className="text-center text-sm mt-4">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="text-primary hover:underline">
                    Inicia sesión
                </Link>
            </div>
        </form>
    );
};
