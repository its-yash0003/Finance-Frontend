import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Records from './pages/Records';
import Users from './pages/Users';
import NotFound from './pages/NotFound';
import { ROLES } from './utils/constants';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Role-based redirect after login
const getRedirectPath = (role) => {
  switch (role) {
    case ROLES.ADMIN:
    case ROLES.ANALYST:
      return '/dashboard';
    case ROLES.VIEWER:
      return '/records';
    default:
      return '/dashboard';
  }
};

function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={getRedirectPath(user?.role)} replace />
          ) : (
            <Login />
          )
        }
      />

      {/* Protected Routes with Layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.ANALYST]}>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/records"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.ANALYST, ROLES.VIEWER]}>
            <Layout>
              <Records />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <Layout>
              <Users />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Redirects */}
      <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated ? getRedirectPath(user?.role) : '/login'}
            replace
          />
        }
      />

      <Route
        path="/unauthorized"
        element={
          <Layout>
            <NotFound title="403 - Unauthorized" message="You don't have permission to access this page." />
          </Layout>
        }
      />

      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
