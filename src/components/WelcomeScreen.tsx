import React, { useEffect } from 'react';
import { Clipboard, Users } from 'lucide-react';
import { useTelegram } from '../contexts/TelegramContext';

const WelcomeScreen: React.FC = () => {
  const { webApp, user } = useTelegram();

  useEffect(() => {
    if (webApp) {
      webApp.mainButton.text = "Create New Board";
      webApp.mainButton.onClick(() => {
        // Handle board creation when the user clicks the main button
        // This would typically make an API call to create a new board
        console.log("Creating new board...");
      });
      webApp.mainButton.show();
    }

    return () => {
      if (webApp) {
        webApp.mainButton.offClick();
        webApp.mainButton.hide();
      }
    };
  }, [webApp]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="p-4 mb-6 rounded-full secondary-bg">
        <Clipboard className="w-12 h-12" style={{ color: 'var(--tg-theme-button-color)' }} />
      </div>
      
      <h1 className="mb-2 text-2xl font-bold">Welcome to TeamBoard</h1>
      <p className="mb-6 hint-text">Your Kanban board for Manager-Assistant teamwork</p>
      
      <div className="w-full max-w-md p-4 mb-6 rounded-lg secondary-bg">
        <div className="flex items-center mb-3">
          <Users className="w-5 h-5 mr-2" />
          <h3 className="font-semibold">Getting Started</h3>
        </div>
        <p className="text-sm text-left hint-text">
          To use TeamBoard, you need to:
        </p>
        <ol className="mt-2 ml-6 text-sm text-left list-decimal hint-text">
          <li className="mb-1">Add @TeamBoardBot to a group chat with exactly one other person</li>
          <li className="mb-1">The bot will automatically assign roles (Manager/Assistant)</li>
          <li>Use the /create command to add tasks directly from your chat</li>
        </ol>
      </div>
      
      <p className="text-xs hint-text">
        Click the button below to create your first board
      </p>
    </div>
  );
};

export default WelcomeScreen;