import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { AuthService } from '../services/auth.service';

const resetPasswordSchema = z.object({
    newPassword: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string().min(8, 'Debe confirmar la contraseña'),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const mutation = useMutation({
        mutationFn: AuthService.resetPassword,
        onSuccess: () => {
            toast.success('Contraseña actualizada correctamente. Ya puedes iniciar sesión.');
            navigate('/login');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Error al restablecer contraseña, token inválido o expirado');
        },
    });

    const onSubmit = (data: ResetPasswordFormData) => {
        if (!token || !email) {
            toast.error('Enlace de recuperación inválido');
            return;
        }

        mutation.mutate({
            email,
            token,
            newPassword: data.newPassword,
        });
    };

    if (!token || !email) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Enlace inválido</h2>
                <p className="text-gray-600">Este enlace de recuperación no es válido o está incompleto.</p>
                <Button onClick={() => navigate('/login')}>Volver a Inicio de Sesión</Button>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Restablecer Contraseña</h2>
                <p className="text-sm text-gray-600">Introduce la nueva contraseña para tu cuenta de {email}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Nueva Contraseña"
                    type="password"
                    placeholder="********"
                    error={errors.newPassword}
                    {...register('newPassword')}
                />
                
                <Input
                    label="Confirmar Contraseña"
                    type="password"
                    placeholder="********"
                    error={errors.confirmPassword}
                    {...register('confirmPassword')}
                />

                <Button
                    type="submit"
                    fullWidth
                    loading={mutation.isPending}
                    className="mt-6"
                >
                    Actualizar Contraseña
                </Button>
            </form>
        </div>
    );
};
