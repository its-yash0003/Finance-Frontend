import { FileX } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  icon: Icon = FileX,
  title = 'No data found',
  description = 'There are no items to display at the moment.',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        py-12 px-4 text-center
        glass-card
        ${className}
      `}
    >
      <div className="mb-4 p-4 bg-slate-800/50 rounded-full">
        <Icon size={32} className="text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-slate-400 text-sm max-w-sm mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
