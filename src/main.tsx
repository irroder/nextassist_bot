import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { TelegramProvider } from "./contexts/TelegramContext";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		{/* <TelegramProvider> */}
		<App />
		{/* </TelegramProvider> */}
	</StrictMode>
);
