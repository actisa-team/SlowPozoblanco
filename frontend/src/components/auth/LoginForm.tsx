import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { AuthService } from '../../services/auth.service';
import { useAuthStore } from '../../stores/authStore';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { useState } from 'react';

const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, 'La contraseña es requerida'),
});

type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Formulario de inicio de sesión que gestiona la autenticación del usuario.
 * Utiliza React Hook Form para la gestión del estado y validación con Zod.
 * 
 * @remarks
 * Redirige al dashboard de administración si el usuario tiene rol ADMIN o MANAGER,
 * o a la página principal en caso contrario.
 */
export const LoginForm = () => {
    const navigate = useNavigate();
    const loginStore = useAuthStore((state) => state.login);
    const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const mutation = useMutation({
        mutationFn: AuthService.login,
        onSuccess: (data) => {
            console.log('Login Success Data:', data);
            loginStore(data.user, data.token);
            toast.success(`Bienvenido, ${data.user.firstName}`);
            if (data.user.role === 'ROLE_ADMIN' || data.user.role === 'ROLE_MANAGER') {
                console.log('Navigating to /admin');
                navigate('/admin');
            } else {
                console.log('Navigating to /');
                navigate('/');
            }
        },
        onError: () => {
            toast.error('Credenciales inválidas');
        },
    });

    const onSubmit = (data: LoginFormData) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Email"
                type="email"
                placeholder="admin@pozoblanco.es"
                error={errors.email}
                {...register('email')}
            />
            <Input
                label="Contraseña"
                type="password"
                placeholder="********"
                error={errors.password}
                {...register('password')}
            />

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(true)}
                    className="text-sm font-medium text-primary hover:text-blue-700 transition-colors"
                >
                    ¿Has olvidado tu contraseña?
                </button>
            </div>

            <Button
                type="submit"
                fullWidth
                loading={mutation.isPending}
            >
                Iniciar Sesión
            </Button>

            <ForgotPasswordModal 
                isOpen={isForgotModalOpen} 
                onClose={() => setIsForgotModalOpen(false)} 
            />
        </form>
    );
};
