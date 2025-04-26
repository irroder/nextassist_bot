import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorScreenProps {
  message: string;
  onRetry?: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <AlertTriangle className="w-12 h-12 mb-4 text-red-500" />
      <h2 className="mb-2 text-xl font-semibold">Something went wrong</h2>
      <p className="mb-6 text-sm hint-text">{message}</p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 rounded-md button"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorScreen;