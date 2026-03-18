import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

/**
 * Formulario de registro de usuarios.
 * Actualmente muestra un mensaje de que el registro está deshabilitado.
 */
export const RegisterForm = () => {
    return (
        <div className="space-y-4">
            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md text-sm">
                El registro público está deshabilitado temporalmente.
            </div>
            <Input label="Email" disabled />
            <Input label="Contraseña" type="password" disabled />
            <Button fullWidth disabled>Registrarse</Button>

            <div className="text-center text-sm">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="text-primary hover:underline">
                    Inicia sesión
                </Link>
            </div>
        </div>
    );
};
