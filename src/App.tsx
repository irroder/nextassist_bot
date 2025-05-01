import { useState, useEffect } from "react";
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
	{ name: "All", icon: <CalendarDays size={18} />, color: "bg-blue-500" },
	{ name: "Inbox", icon: <Inbox size={18} />, color: "bg-orange-500" },
	{ name: "Today", icon: <CalendarCheck size={18} />, color: "bg-green-500" },
	{
		name: "Tomorrow",
		icon: <CalendarClock size={18} />,
		color: "bg-red-500",
	},
	{
		name: "Next 7 Days",
		icon: <CalendarDays size={18} />,
		color: "bg-purple-400",
	},
	{
		name: "Completed",
		icon: <CheckCircle size={18} />,
		color: "bg-gray-500",
	},
];

export default function App() {
	const [showAddTask, setShowAddTask] = useState(false);
	const [taskInput, setTaskInput] = useState("");

	useEffect(() => {
		const initialize = async () => {
			await init();

			// Фикс для мобильного viewport
			const setAppHeight = () => {
				const doc = document.documentElement;
				doc.style.setProperty(
					"--app-height",
					`${window.innerHeight}px`
				);
				doc.style.setProperty(
					"--tg-viewport-height",
					`${window.innerHeight}px`
				);
			};

			window.addEventListener("resize", setAppHeight);
			setAppHeight();

			// Инициализация viewport
			if (viewport.mount.isAvailable()) {
				try {
					await viewport.mount();
					viewport.bindCssVars();
					viewport.expand();

					// Задержка для стабилизации перед полноэкранным режимом
					setTimeout(async () => {
						if (viewport.requestFullscreen.isAvailable()) {
							await viewport.requestFullscreen();
						}
					}, 200);
				} catch (err) {
					console.error("Viewport error:", err);
				}
			}
		};

		initialize();

		return () => {
			window.removeEventListener("resize", () => {});
		};
	}, []);

	const toggleAddTask = () => {
		setShowAddTask(!showAddTask);
	};

	return (
		<div className="app-container">
			{/* Header */}
			<div className="header">
				<div className="user-info">
					<div className="avatar"></div>
					<div className="username">
						<span>Řemmǿřë</span>
						<ChevronRight className="chevron" />
					</div>
				</div>
			</div>

			{/* Group Chat Section */}
			<div className="group-chat-section">
				<div className="group-chat-content">
					<p className="group-chat-title">Add to group chat</p>
					<p className="group-chat-description">
						A collaborative project is created by adding the bot to
						a Telegram group
					</p>
				</div>
				<div className="group-chat-meta">
					<span>1/2</span>
					<ChevronRight className="chevron" />
				</div>
			</div>

			{/* Add Task Section */}
			<div className="add-task-section">
				<div className="add-task-header" onClick={toggleAddTask}>
					<div
						className={`add-task-icon ${showAddTask ? "open" : ""}`}
					>
						<Plus className="plus-icon" />
					</div>
					<span>Add Task</span>
				</div>

				{showAddTask && (
					<div className="task-form">
						<input
							type="text"
							placeholder="Add task"
							value={taskInput}
							onChange={(e) => setTaskInput(e.target.value)}
						/>
						<div className="form-controls">
							<div className="controls-left">
								<button>
									<CalendarPlus /> Today
								</button>
								<button>
									<Repeat />
								</button>
							</div>
							<div className="controls-right">
								<button>
									<Flag />
								</button>
								<button>
									<AlertCircle />
								</button>
								<div className="pro-badge">
									<Star /> Pro
								</div>
							</div>
						</div>
						<div className="task-category">
							<div>
								<Inbox /> Inbox
							</div>
							<button className="submit-button">
								<svg /* иконка отправки */ />
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Categories List */}
			<div className="categories-list">
				{categories.map((cat, i) => (
					<div key={i} className="category-item">
						<div className="category-info">
							<div className={`category-icon ${cat.color}`}>
								{cat.icon}
							</div>
							<span>{cat.name}</span>
						</div>
						<div className="category-meta">
							<span>1</span>
							<ChevronRight className="chevron" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
