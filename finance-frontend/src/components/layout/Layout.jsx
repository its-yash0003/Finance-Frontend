import { useAuth } from '../../hooks/useAuth';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  const getPageTitle = (pathname) => {
    const paths = {
      '/dashboard': 'Dashboard',
      '/records': 'Records',
      '/users': 'Users',
    };
    return paths[pathname] || 'FinanceOS';
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar onLogout={logout} />

      <div className="lg:pl-64">
        <Header title={getPageTitle(window.location.pathname)} user={user} />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
