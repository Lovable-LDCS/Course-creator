import { useNavigate } from 'react-router-dom';
import { Button } from './common/Button';

export function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Check if there's history to go back to, otherwise go home
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => navigate('/')}
            variant="primary"
          >
            Go to Home
          </Button>
          <Button 
            onClick={handleGoBack}
            variant="secondary"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
