import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <Loader2 className="w-12 h-12 mb-4 animate-spin" style={{ color: 'var(--tg-theme-button-color)' }} />
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default LoadingScreen;