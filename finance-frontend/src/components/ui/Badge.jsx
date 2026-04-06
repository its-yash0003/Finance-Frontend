const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const variants = {
    default: 'bg-slate-800 text-slate-300',
    primary: 'bg-primary-500/20 text-primary-400 border border-primary-500/30',
    success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    danger: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    admin: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    analyst: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    viewer: 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
    income: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    expense: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
    active: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    inactive: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
