import { Outlet, Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { useAuthStore } from '../../stores/authStore';

export const PublicLayout = () => {
    const { isAuthenticated, logout } = useAuthStore();

    return (
        <div className="flex min-h-screen flex-col bg-background font-sans">
            <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-surface/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        {/* Logo Placeholder */}
                        <div className="h-8 w-8 rounded bg-primary" />
                        <span className="text-xl font-bold text-primary-dark">Slow Turismo</span>
                    </div>

                    <nav className="hidden gap-6 md:flex">
                        <Link to="/" className="text-sm font-medium text-text hover:text-primary">Inicio</Link>
                        <Link to="/tourism-resources" className="text-sm font-medium text-text hover:text-primary">Recursos Turísticos</Link>
                        <Link to="/parking" className="text-sm font-medium text-text hover:text-primary">Aparcamiento</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <Button variant="outline" size="sm" onClick={logout}>Salir</Button>
                        ) : (
                            <div className="flex gap-2">
                                <Link to="/login">
                                    <Button variant="outline" size="sm">Entrar</Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm">Registrarse</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>

            <footer className="border-t border-gray-200 bg-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm text-text-secondary">
                        © {new Date().getFullYear()} Ayuntamiento de Pozoblanco. Proyecto Slow Turismo.
                    </p>
                </div>
            </footer>
        </div>
    );
};
