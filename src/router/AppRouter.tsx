import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuthStore } from '../store/authStore';

// Public pages
const LandingPage   = lazy(() => import('../pages/public/LandingPage'));
const LoginPage     = lazy(() => import('../pages/public/LoginPage'));
const RegisterPage  = lazy(() => import('../pages/public/RegisterPage'));

// Dashboard pages
const OverviewPage    = lazy(() => import('../pages/dashboard/OverviewPage'));
const ProjectsPage    = lazy(() => import('../pages/dashboard/ProjectsPage'));
const ClientsPage     = lazy(() => import('../pages/dashboard/ClientsPage'));
const AnalyticsPage   = lazy(() => import('../pages/dashboard/AnalyticsPage'));
const ReportsPage     = lazy(() => import('../pages/dashboard/ReportsPage'));
const TeamPage        = lazy(() => import('../pages/dashboard/TeamPage'));
const SettingsPage        = lazy(() => import('../pages/dashboard/SettingsPage'));
const ClientPortalPage    = lazy(() => import('../pages/dashboard/ClientPortalPage'));

// Guards
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

const Loading = () => (
  <div className="min-h-screen bg-[#070B14] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

export const AppRouter: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

      {/* Protected dashboard */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<OverviewPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="settings"       element={<SettingsPage />} />
        <Route path="client-portal" element={<ClientPortalPage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);
