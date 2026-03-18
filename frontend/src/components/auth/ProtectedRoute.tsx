import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { UserRole } from '../../types/auth.types';

interface ProtectedRouteProps {
    allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useAuthStore();
    console.log('ProtectedRoute Check:', { isAuthenticated, user, allowedRoles });

    if (!isAuthenticated) {
        console.log('Not authenticated, redirecting to login');
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        console.log('Role mismatch', { userRole: user.role, allowed: allowedRoles });
        return <Navigate to="/unauthorized" replace />; // Or dashboard
    }

    return <Outlet />;
};
