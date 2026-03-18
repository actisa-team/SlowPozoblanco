import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Layouts
import { AuthLayout } from './components/layouts/AuthLayout';
import { PublicLayout } from './components/layouts/PublicLayout';
import { AdminLayout } from './components/layouts/AdminLayout';

// Auth
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Public Pages
import { TourismResources } from './pages/TourismResources';
import { TourismResourceDetail } from './pages/TourismResourceDetail';
import { Parking } from './pages/Parking';

// Admin Pages
import { AdminDashboard } from './pages/Admin/Dashboard';
import { UsersManager } from './pages/Admin/UsersManager';
import { TourismResourcesManager } from './pages/Admin/TourismResourcesManager';
import { DigitalSignageManager } from './pages/Admin/DigitalSignageManager';
import { Settings } from './pages/Admin/Settings';

// Totem Page
import { TotemPage } from './pages/TotemPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes with Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Navigate to="/tourism-resources" replace />} />
            <Route path="/resources" element={<Navigate to="/tourism-resources" replace />} />
            <Route path="/tourism-resources" element={<TourismResources />} />
            <Route path="/resources/:id" element={<TourismResourceDetail />} />
            <Route path="/parking" element={<Parking />} />
          </Route>

          {/* Authentication */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Route>

          {/* Admin Routes with Sidebar Layout */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UsersManager />} />
              <Route path="/admin/tourism-resources" element={<TourismResourcesManager />} />
              <Route path="/admin/digital-signage" element={<DigitalSignageManager />} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/admin/signage" element={<DigitalSignageManager />} />
            </Route>
          </Route>

          {/* Totem Route - Isolated */}
          <Route path="/totem" element={<TotemPage />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
