import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = 'primary',
  className = '',
}) => {
  const colors = {
    primary: {
      bg: 'bg-gradient-to-br from-primary-500/20 to-primary-600/10',
      icon: 'text-primary-400',
      trend: 'text-primary-400',
    },
    success: {
      bg: 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10',
      icon: 'text-emerald-400',
      trend: 'text-emerald-400',
    },
    danger: {
      bg: 'bg-gradient-to-br from-rose-500/20 to-rose-600/10',
      icon: 'text-rose-400',
      trend: 'text-rose-400',
    },
    info: {
      bg: 'bg-gradient-to-br from-blue-500/20 to-blue-600/10',
      icon: 'text-blue-400',
      trend: 'text-blue-400',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500/20 to-purple-600/10',
      icon: 'text-purple-400',
      trend: 'text-purple-400',
    },
  };

  const selectedColor = colors[color] || colors.primary;

  return (
    <div
      className={`
        glass-card p-6
        ${selectedColor.bg}
        transition-all duration-200 hover:scale-[1.02]
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-slate-400">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${selectedColor.trend}`}>
              {trend >= 0 ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              <span>{Math.abs(trend)}% from last month</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl bg-white/5 ${selectedColor.icon}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
