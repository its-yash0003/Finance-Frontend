import { Bell } from 'lucide-react';
import { ROLES, ROLE_LABELS, ROLE_COLORS } from '../../utils/constants';
import Badge from '../ui/Badge';

const Header = ({ title, user }) => {
  const pageTitle = title || 'Dashboard';

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="flex items-center justify-between h-16 px-6">
        <h1 className="text-xl font-semibold text-white">{pageTitle}</h1>

        <div className="flex items-center gap-4">
          {/* Role badge */}
          {user?.role && (
            <Badge variant={user.role} size="md">
              {ROLE_LABELS[user.role]}
            </Badge>
          )}

          {/* Notification bell (decorative) */}
          <button
            className="relative p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
