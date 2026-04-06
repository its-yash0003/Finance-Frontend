const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };

  return (
    <div
      className={`
        animate-spin rounded-full
        border-primary-500 border-r-transparent
        ${sizes[size]}
        ${className}
      `}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const LoadingOverlay = ({ message = 'Loading...' }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-3">
      <Spinner size="lg" />
      {message && <p className="text-slate-300 text-sm">{message}</p>}
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        className="flex gap-4 animate-pulse"
      >
        <div className="h-10 w-10 bg-slate-800 rounded" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-800 rounded w-3/4" />
          <div className="h-3 bg-slate-800 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export const CardSkeleton = ({ count = 1 }) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="glass-card p-6 animate-pulse"
      >
        <div className="h-4 bg-slate-800 rounded w-1/2 mb-4" />
        <div className="h-8 bg-slate-800 rounded w-3/4 mb-2" />
        <div className="h-3 bg-slate-800 rounded w-1/4" />
      </div>
    ))}
  </div>
);

export default Spinner;
