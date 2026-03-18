import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { UserRole } from '../../types/auth.types';
import {
    LayoutDashboard,
    MapPin,
    Monitor,
    Tv,
    Users,
    LogOut,
    Settings
} from 'lucide-react';
import clsx from 'clsx';
import { ROLE_TRANSLATIONS } from '../../constants/translations';


export const AdminLayout = () => {
    const { logout, user } = useAuthStore();
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Recursos Turísticos', href: '/admin/tourism-resources', icon: MapPin },
        // { name: 'Señalización', href: '/admin/signage', icon: Monitor },
        // { name: 'Cartelera', href: '/admin/digital-signs', icon: Tv },
        { name: 'Usuarios', href: '/admin/users', icon: Users, adminOnly: true },
        { name: 'Configuración', href: '/admin/settings', icon: Settings, adminOnly: true },
    ];

    // Filter navigation based on user role
    const filteredNavigation = navigation.filter(item => {
        if (item.adminOnly && user?.role === UserRole.MANAGER) {
            return false;
        }
        return true;
    });

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
                <div className="flex h-16 items-center justify-center border-b px-4">
                    <span className="text-lg font-bold text-primary-dark">Panel Administrativo</span>
                </div>

                <div className="flex flex-col justify-between h-[calc(100vh-4rem)] p-4">
                    <nav className="space-y-1">
                        {filteredNavigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={clsx(
                                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                        isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t pt-4">
                        <div className="mb-4 flex items-center gap-3 px-3">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                {user?.firstName?.charAt(0)}
                            </div>
                            <div className="text-sm">
                                <p className="font-medium text-gray-900">{user?.firstName}</p>
                                <p className="text-xs text-gray-500 capitalize">
                                    {user?.role ? ROLE_TRANSLATIONS[user.role] : ''}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="h-5 w-5" />
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="pl-64 flex-1">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
