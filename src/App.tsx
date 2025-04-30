import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Inbox,
	CalendarDays,
	CalendarCheck,
	CalendarClock,
	CheckCircle,
	UserPlus,
	ChevronRight,
	CalendarPlus,
	Repeat,
	Flag,
	AlertCircle,
	Star,
	Plus,
} from "lucide-react";

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

	return (
		<div className="bg-[#1a1b1c] min-h-screen text-white p-4 relative max-w-[100vw] overflow-x-hidden">
			<div className="flex justify-between items-center mb-4">
				<div className="flex items-center gap-2">
					<img
						src="https://placehold.co/32x32"
						alt="avatar"
						className="rounded-full w-8 h-8"
					/>
					<div className="flex items-center gap-1 bg-[#28292b] px-2 py-1 rounded">
						<span className="font-semibold">Řemmǿřë</span>
						<ChevronRight className="w-4 h-4 text-gray-400" />
					</div>
				</div>
			</div>

			<div className="bg-[#28292b] rounded-xl p-4 flex items-center gap-3 mb-4">
				<div className="bg-green-600 rounded-md w-8 h-8 flex items-center justify-center">
					<UserPlus className="text-white w-5 h-5" />
				</div>
				<div>
					<p className="font-medium text-white">Add to group chat</p>
					<p className="text-sm text-gray-400">
						A collaborative project is created by adding the bot to
						a Telegram group
					</p>
				</div>
				<span className="ml-auto text-sm text-gray-400">0/2</span>
			</div>

			<div
				className="flex items-center justify-between bg-[#28292b] p-3 rounded-xl cursor-pointer mb-3"
				onClick={() => setShowAddTask(!showAddTask)}
			>
				<div className="flex items-center gap-3">
					<div className="bg-[#28292b] p-1.5 rounded-md border border-gray-600">
						<Plus className="text-gray-400 w-5 h-5" />
					</div>
					<span>Add Task</span>
				</div>
			</div>

			<AnimatePresence>
				{showAddTask && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="bg-[#28292b] rounded-xl p-4 mb-4 space-y-3 overflow-hidden"
					>
						<p className="text-sm text-white">Add task</p>
						<input
							type="text"
							placeholder="Add task"
							className="w-full bg-[#1a1b1c] text-white p-2 rounded"
							value={taskInput}
							onChange={(e) => setTaskInput(e.target.value)}
						/>
						<div className="flex justify-between text-gray-400">
							<div className="flex gap-4">
								<div className="flex items-center gap-1">
									<CalendarPlus className="w-4 h-4" /> Today
								</div>
								<Repeat className="w-4 h-4" />
							</div>
							<div className="flex gap-3">
								<Flag className="w-4 h-4" />
								<AlertCircle className="w-4 h-4" />
								<div className="flex items-center gap-1 bg-[#6a0dad] px-1.5 py-0.5 rounded text-white">
									<Star className="w-4 h-4" /> Pro
								</div>
							</div>
						</div>
						<div className="flex items-center justify-between bg-[#1a1b1c] p-2 rounded">
							<Inbox className="w-5 h-5 text-gray-400" />
							<button className="bg-white text-black p-2 rounded-full">
								<ChevronRight className="w-5 h-5" />
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<div className="bg-[#28292b] rounded-xl p-3 space-y-1">
				{categories.map((cat, i) => (
					<div
						key={i}
						className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-[#1a1b1c] transition-colors"
					>
						<div className="flex items-center gap-3">
							<div className={`${cat.color} p-1.5 rounded-md`}>
								{React.cloneElement(cat.icon, {
									className: "text-white w-5 h-5",
								})}
							</div>
							<span>{cat.name}</span>
						</div>
						<div className="flex items-center gap-2 text-gray-500">
							<span>0</span>
							<ChevronRight className="w-4 h-4" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
