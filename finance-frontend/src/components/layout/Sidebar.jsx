import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Wallet,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, ROLE_COLORS, ROLE_LABELS } from '../../utils/constants';
import Badge from '../ui/Badge';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: [ROLES.ADMIN, ROLES.ANALYST],
  },
  {
    name: 'Records',
    href: '/records',
    icon: FileText,
    roles: [ROLES.ADMIN, ROLES.ANALYST, ROLES.VIEWER],
  },
  {
    name: 'Users',
    href: '/users',
    icon: Users,
    roles: [ROLES.ADMIN],
  },
];

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const visibleNav = navigation.filter((item) =>
    item.roles.includes(user?.role)
  );

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg glass-card text-slate-400 hover:text-white"
      >
        <Menu size={20} />
      </button>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64
          bg-slate-900 border-r border-slate-800
          transform transition-transform duration-300
          lg:translate-x-0
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <Link
              to="/"
              className="flex items-center gap-2.5"
              onClick={() => setIsMobileOpen(false)}
            >
              <div className="p-2 bg-primary-500/20 rounded-xl">
                <Wallet size={20} className="text-primary-400" />
              </div>
              <span className="text-xl font-bold text-white">FinanceOS</span>
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {visibleNav.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${isActive
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-400">
                  {getInitials(user?.name)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name}
                </p>
                <Badge
                  variant={user?.role}
                  size="sm"
                  className="mt-1"
                >
                  {ROLE_LABELS[user?.role]}
                </Badge>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white
                transition-all duration-200"
            >
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      <div
        className="lg:hidden fixed inset-0 bg-black/50 z-40"
        style={{ display: isMobileOpen ? 'block' : 'none' }}
        onClick={() => setIsMobileOpen(false)}
      />
    </>
  );
};

export default Sidebar;
