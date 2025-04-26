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
		console.log("App: State changed", {
			isReady,
			user,
			chatInstance,
			initializing,
		});
	}, [isReady, user, chatInstance, initializing]);

	useEffect(() => {
		// Set header and background colors based on theme
		if (webApp) {
			console.log("App: Setting theme colors", { isDarkMode });
			webApp.setHeaderColor(isDarkMode ? "#1f2937" : "#f8fafc");
			webApp.setBackgroundColor(isDarkMode ? "#111827" : "#ffffff");
		}
	}, [webApp, isDarkMode]);

	useEffect(() => {
		if (isReady && user && chatInstance) {
			console.log("App: Fetching board for chat instance", chatInstance);
			// We have a chat instance, try to fetch the board
			fetchBoard(parseInt(chatInstance)).finally(() => {
				console.log("App: Board fetch completed");
				setInitializing(false);
			});
		} else if (isReady && user) {
			console.log("App: No chat instance, first time opening");
			// No chat instance, this might be the first time opening
			setInitializing(false);
		}
	}, [isReady, user, chatInstance, fetchBoard]);

	if (!isReady || !user) {
		console.log("App: Not ready or no user", { isReady, user });
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
