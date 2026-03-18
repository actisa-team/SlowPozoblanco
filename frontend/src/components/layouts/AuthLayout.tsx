import { Outlet, Link } from 'react-router-dom';

export const AuthLayout = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
            <div className="mb-8 text-center">
                <Link to="/" className="text-2xl font-bold text-primary-dark">
                    Slow Turismo
                </Link>
                <p className="mt-2 text-sm text-gray-600">Portal de Gestión Inteligente</p>
            </div>

            <div className="w-full max-w-md bg-white p-8 shadow-xl rounded-2xl">
                <Outlet />
            </div>
        </div>
    );
};
