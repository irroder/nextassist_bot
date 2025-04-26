import React, { createContext, useContext, useEffect, useState } from "react";
import { TelegramWebApp } from "../types";
import { init } from "@telegram-apps/sdk";
import { isTMA } from "@telegram-apps/bridge";

interface TelegramContextType {
	webApp: TelegramWebApp | null;
	user: {
		id: number;
		firstName: string;
		lastName?: string;
		username?: string;
		photoUrl?: string;
	} | null;
	isReady: boolean;
	chatInstance?: string;
	chatType?: string;
	startParam?: string;
	isDarkMode: boolean;
}

const TelegramContext = createContext<TelegramContextType>({
	webApp: null,
	user: null,
	isReady: false,
	isDarkMode: false,
});

export const useTelegram = () => useContext(TelegramContext);

export const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
	const [user, setUser] = useState<TelegramContextType["user"]>(null);
	const [isReady, setIsReady] = useState(false);
	const [chatInstance, setChatInstance] = useState<string | undefined>(
		undefined
	);
	const [chatType, setChatType] = useState<string | undefined>(undefined);
	const [startParam, setStartParam] = useState<string | undefined>(undefined);
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		console.log("TelegramProvider: Initializing...");

		// Initialize the Telegram Mini App SDK
		init();
		console.log("TelegramProvider: SDK initialized");

		// Check if we're in a Telegram Mini App environment
		const checkEnvironment = async () => {
			try {
				console.log("TelegramProvider: Checking environment...");
				const isTelegramEnv = await isTMA();
				console.log("TelegramProvider: isTMA result:", isTelegramEnv);

				if (!isTelegramEnv) {
					console.log(
						"TelegramProvider: Not in Telegram environment, creating mock..."
					);
					// Create a mock Telegram WebApp object
					const mockWebApp: TelegramWebApp = {
						ready: () => {
							console.log("TelegramProvider: Mock ready called");
						},
						expand: () => {
							console.log("TelegramProvider: Mock expand called");
						},
						close: () => {
							console.log("TelegramProvider: Mock close called");
						},
						mainButton: {
							text: "",
							show: () => {},
							hide: () => {},
							onClick: (callback: () => void) => {},
							offClick: (callback: () => void) => {},
							enable: () => {},
							disable: () => {},
							showProgress: () => {},
							hideProgress: () => {},
						},
						backButton: {
							show: () => {},
							hide: () => {},
							onClick: (callback: () => void) => {},
							offClick: (callback: () => void) => {},
						},
						onEvent: (event: string, callback: Function) => {
							console.log(
								"TelegramProvider: Mock onEvent called with",
								event
							);
						},
						offEvent: (event: string, callback: Function) => {},
						initDataUnsafe: {
							user: {
								id: 99281932,
								first_name: "Andrew",
								last_name: "Rogue",
								username: "rogue",
								language_code: "en",
								photo_url: "",
							},
							chat_type: "sender",
							chat_instance: "8428209589180549439",
							start_param: "debug",
						},
						colorScheme: "light",
						themeParams: {
							bg_color: "#ffffff",
							text_color: "#000000",
							hint_color: "#999999",
							link_color: "#2481cc",
							button_color: "#2481cc",
							button_text_color: "#ffffff",
							secondary_bg_color: "#f0f0f0",
						},
						isVersionAtLeast: (version: string) => true,
						setHeaderColor: (color: string) => {},
						setBackgroundColor: (color: string) => {},
						enableClosingConfirmation: () => {},
						disableClosingConfirmation: () => {},
					};

					// Set the mock WebApp
					setWebApp(mockWebApp);
					console.log("TelegramProvider: Mock WebApp set");

					// Set user data
					setUser({
						id: mockWebApp.initDataUnsafe.user!.id,
						firstName: mockWebApp.initDataUnsafe.user!.first_name,
						lastName: mockWebApp.initDataUnsafe.user!.last_name,
						username: mockWebApp.initDataUnsafe.user!.username,
						photoUrl: mockWebApp.initDataUnsafe.user!.photo_url,
					});

					// Set chat data
					setChatInstance(mockWebApp.initDataUnsafe.chat_instance);
					setChatType(mockWebApp.initDataUnsafe.chat_type);
					setStartParam(mockWebApp.initDataUnsafe.start_param);

					// Set dark mode
					setIsDarkMode(mockWebApp.colorScheme === "dark");

					// Set ready state
					setIsReady(true);
					console.log("TelegramProvider: Mock environment ready");
				}
			} catch (error) {
				console.error(
					"TelegramProvider: Error checking environment:",
					error
				);
			}
		};

		checkEnvironment();

		// Check if Telegram WebApp is available
		console.log("TelegramProvider: Checking window.Telegram?.WebApp");
		const tg = window.Telegram?.WebApp;
		if (tg) {
			console.log("TelegramProvider: Telegram WebApp found");
			setWebApp(tg);

			// Extract user data
			if (tg.initDataUnsafe?.user) {
				console.log(
					"TelegramProvider: User data found",
					tg.initDataUnsafe.user
				);
				setUser({
					id: tg.initDataUnsafe.user.id,
					firstName: tg.initDataUnsafe.user.first_name,
					lastName: tg.initDataUnsafe.user.last_name,
					username: tg.initDataUnsafe.user.username,
					photoUrl: tg.initDataUnsafe.user.photo_url,
				});
			} else {
				console.log(
					"TelegramProvider: No user data found in initDataUnsafe"
				);
			}

			// Extract chat data
			setChatInstance(tg.initDataUnsafe.chat_instance);
			setChatType(tg.initDataUnsafe.chat_type);
			setStartParam(tg.initDataUnsafe.start_param);
			console.log("TelegramProvider: Chat data set", {
				chatInstance: tg.initDataUnsafe.chat_instance,
				chatType: tg.initDataUnsafe.chat_type,
				startParam: tg.initDataUnsafe.start_param,
			});

			// Check color scheme
			setIsDarkMode(tg.colorScheme === "dark");
			console.log("TelegramProvider: Color scheme set", tg.colorScheme);

			// Set up theme change listener
			tg.onEvent("themeChanged", () => {
				console.log(
					"TelegramProvider: Theme changed to",
					tg.colorScheme
				);
				setIsDarkMode(tg.colorScheme === "dark");
			});

			// Inform Telegram that the Mini App is ready
			console.log("TelegramProvider: Calling tg.ready()");
			tg.ready();
			setIsReady(true);

			// Expand to full height
			console.log("TelegramProvider: Calling tg.expand()");
			tg.expand();
		} else {
			console.log(
				"TelegramProvider: Telegram WebApp not found in window.Telegram"
			);
		}
	}, []);

	return (
		<TelegramContext.Provider
			value={{
				webApp,
				user,
				isReady,
				chatInstance,
				chatType,
				startParam,
				isDarkMode,
			}}
		>
			{children}
		</TelegramContext.Provider>
	);
};
