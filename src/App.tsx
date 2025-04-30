import React, { useState, useEffect } from "react";
import {
	Inbox,
	CalendarDays,
	CalendarCheck,
	CalendarClock,
	CheckCircle,
	ChevronRight,
	CalendarPlus,
	Repeat,
	Flag,
	AlertCircle,
	Star,
	Plus,
} from "lucide-react";
import { init, viewport } from "@telegram-apps/sdk";
import "./index.css";

const categories = [
	{ name: "All", icon: <CalendarDays />, color: "bg-blue-500" },
	{ name: "Inbox", icon: <Inbox />, color: "bg-orange-500" },
	{ name: "Today", icon: <CalendarCheck />, color: "bg-green-500" },
	{ name: "Tomorrow", icon: <CalendarClock />, color: "bg-red-500" },
	{ name: "Next 7 Days", icon: <CalendarDays />, color: "bg-purple-400" },
	{ name: "Completed", icon: <CheckCircle />, color: "bg-gray-500" },
];

export default function App() {
	const [showAddTask, setShowAddTask] = useState(false);
	const [taskInput, setTaskInput] = useState("");

	useEffect(() => {
		// Инициализация viewport и мета-тегов
		const initializeApp = async () => {
			// Добавляем viewport meta tag для мобильных устройств
			const meta = document.createElement("meta");
			meta.name = "viewport";
			meta.content =
				"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
			document.head.appendChild(meta);

			// Инициализация Telegram SDK
			await init();

			// Установка высоты viewport
			const setViewportHeight = () => {
				document.documentElement.style.setProperty(
					"--tg-viewport-height",
					`${window.innerHeight}px`
				);
			};

			setViewportHeight();
			window.addEventListener("resize", setViewportHeight);

			// Инициализация полноэкранного режима
			const enableFullscreen = async () => {
				try {
					if (viewport.requestFullscreen.isAvailable()) {
						await new Promise((resolve) =>
							setTimeout(resolve, 100)
						);
						await viewport.requestFullscreen();
					}
				} catch (error) {
					console.error("Fullscreen error:", error);
				}
			};

			await enableFullscreen();

			return () => {
				window.removeEventListener("resize", setViewportHeight);
			};
		};

		initializeApp();
	}, []);

	const toggleAddTask = (e: React.MouseEvent) => {
		if (
			e.target === e.currentTarget ||
			(e.target as HTMLElement).closest(".button-content")
		) {
			setShowAddTask(!showAddTask);
		}
	};

	return (
		<div className="app-container">
			<div className="flex justify-between items-center mb-4">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 rounded-full bg-red-500"></div>
					<div className="flex items-center gap-1 px-2 py-1 rounded">
						<span className="font-semibold">Řemmǿřë</span>
						<ChevronRight className="w-4 h-4 text-gray-400" />
					</div>
				</div>
			</div>

			<div className="bg-[#000000] rounded-xl p-4 flex items-center gap-3 mb-4 cursor-pointer">
				<div>
					<p className="pl-6 font-medium text-white">
						Add to group chat
					</p>
					<p className="pl-6 text-sm text-gray-400">
						A collaborative project is created by adding the bot to
						a Telegram group
					</p>
				</div>
				<span className="ml-auto text-sm text-gray-400">1/2</span>
				<ChevronRight className="ml-2 w-4 h-4 text-gray-400" />
			</div>

			<div
				className={`add-task-button mb-4 ${showAddTask ? "open" : ""}`}
				onClick={toggleAddTask}
			>
				<div className="button-content pl-4">
					<div
						className={`p-1.5 rounded-md ${
							showAddTask ? "bg-transparent" : "bg-[#000000]"
						}`}
					>
						<Plus className="text-gray-400 plus-icon" />
					</div>
					<span className="text-sm">Add Task</span>
				</div>

				<div
					className="form-content"
					onClick={(e) => e.stopPropagation()}
				>
					<input
						type="text"
						placeholder="Add task"
						className="w-full bg-[#000000] text-white p-3 rounded-lg focus:outline-none placeholder-gray-500 mb-3"
						value={taskInput}
						onChange={(e) => setTaskInput(e.target.value)}
					/>
					<div className="flex justify-between items-center text-gray-400 mb-3">
						<div className="flex gap-4 items-center">
							<button className="flex items-center gap-1 text-blue-400 bg-[#000000] px-2 py-1 rounded-md text-xs">
								<CalendarPlus className="w-4 h-4" /> Today
							</button>
							<button className="text-gray-400 bg-[#000000] p-1 rounded-md">
								<Repeat className="w-4 h-4" />
							</button>
						</div>
						<div className="flex gap-3 items-center">
							<button className="text-gray-400 bg-[#000000] p-1 rounded-md">
								<Flag className="w-4 h-4" />
							</button>
							<button className="text-gray-400 bg-[#000000] p-1 rounded-md">
								<AlertCircle className="w-4 h-4" />
							</button>
							<div className="flex items-center gap-1 bg-purple-600 px-1.5 py-0.5 rounded text-white text-xs">
								<Star className="w-3 h-3" /> Pro
							</div>
						</div>
					</div>
					<div className="flex items-center justify-between bg-[#000000] p-2 rounded-lg">
						<div className="flex items-center gap-2">
							<Inbox className="w-5 h-5 text-orange-500" />
							<span className="text-sm text-white">Inbox</span>
						</div>
						<button className="bg-blue-500 text-white p-1.5 rounded-full w-7 h-7 flex items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="22" y1="2" x2="11" y2="13"></line>
								<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
							</svg>
						</button>
					</div>
				</div>
			</div>

			<div className="bg-[#000000] rounded-xl pl-3 pr-3 pt-1 pb-1 space-y-1">
				{categories.map((cat, i) => (
					<div key={i} className="categories-item">
						<div className="category-content">
							<div className={`${cat.color} icon-wrapper`}>
								{React.cloneElement(cat.icon, {
									className: "text-white w-4 h-4",
								})}
							</div>
							<span className="text">{cat.name}</span>
						</div>
						<div className="flex items-center gap-2 text-gray-500">
							<span className="text-xs">1</span>
							<ChevronRight className="w-3 h-3" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
