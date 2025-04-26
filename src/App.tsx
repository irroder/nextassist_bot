import React, { useEffect, useState } from "react";
import { useTelegram } from "./contexts/TelegramContext";
import { useBoardStore } from "./store/boardStore";
import KanbanBoard from "./components/KanbanBoard";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";
import WelcomeScreen from "./components/WelcomeScreen";

const App: React.FC = () => {
	const { webApp, user, isReady, chatInstance, isDarkMode } = useTelegram();
	const { fetchBoard, board, loading, error } = useBoardStore();
	const [initializing, setInitializing] = useState(true);

	useEffect(() => {
		// Set header and background colors based on theme
		if (webApp) {
			webApp.setHeaderColor(isDarkMode ? "#1f2937" : "#f8fafc");
			webApp.setBackgroundColor(isDarkMode ? "#111827" : "#ffffff");
		}
	}, [webApp, isDarkMode]);

	useEffect(() => {
		if (isReady && user && chatInstance) {
			// We have a chat instance, try to fetch the board
			fetchBoard(parseInt(chatInstance)).finally(() =>
				setInitializing(false)
			);
		} else if (isReady && user) {
			// No chat instance, this might be the first time opening
			setInitializing(false);
		}
	}, [isReady, user, chatInstance, fetchBoard]);

	if (!isReady || !user) {
		return <LoadingScreen message="Initializing TeamBoard..." />;
	}

	if (initializing) {
		return <LoadingScreen message="Loading your board..." />;
	}

	if (error) {
		return <ErrorScreen message={error} />;
	}

	// If we have a board, show it
	if (board) {
		return <KanbanBoard board={board} />;
	}

	// No board yet, show welcome screen
	return <WelcomeScreen />;
};

export default App;
