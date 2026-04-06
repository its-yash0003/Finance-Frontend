import { useNavigate } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound = ({ title = '404', message = 'The page you are looking for does not exist.' }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="inline-flex p-4 bg-amber-500/20 rounded-full mb-6">
          <AlertTriangle size={48} className="text-amber-400" />
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold text-white mb-4">{title}</h1>

        {/* Message */}
        <p className="text-slate-400 text-lg mb-8">{message}</p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => navigate(-1)} variant="secondary">
            Go Back
          </Button>
          <Button onClick={() => navigate('/')}>
            <Home size={18} className="mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
