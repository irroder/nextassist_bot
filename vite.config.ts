import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as fs from "node:fs";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		exclude: ["lucide-react"],
	},
	server: {
		port: 443,
		host: true,
		hmr: {
			host: "localhost",
			port: 443,
		},
		https: {
			key: fs.readFileSync("./.cert/localhost-key.pem"),
			cert: fs.readFileSync("./.cert/localhost.pem"),
		},
		cors: true,
	},
});
