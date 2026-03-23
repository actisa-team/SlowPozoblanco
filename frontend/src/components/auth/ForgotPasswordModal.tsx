import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Modal } from '../ui/Modal';
import { AuthService } from '../../services/auth.service';

const forgotPasswordSchema = z.object({
    email: z.string().email('Email inválido'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const mutation = useMutation({
        mutationFn: AuthService.forgotPassword,
        onSuccess: (message: string | void) => {
            toast.success(typeof message === 'string' ? message : 'Enviado correctamente', { duration: 5000 });
            reset();
            onClose();
        },
        onError: (error: any) => {
            const errorMsg = error?.response?.data?.message || error.message || 'Ocurrió un error general';
            toast.error(errorMsg);
        },
    });

    const onSubmit = (data: ForgotPasswordFormData) => {
        mutation.mutate(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Recuperar Contraseña">
            <div className="mb-4 text-sm text-gray-600">
                Introduce el correo electrónico asociado a tu cuenta para recibir las instrucciones para restablecer tu contraseña.
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Email"
                    type="email"
                    placeholder="ejemplo@pozoblanco.es"
                    error={errors.email}
                    {...register('email')}
                />

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                    <Button type="submit" loading={mutation.isPending}>
                        Enviar Enlace
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
