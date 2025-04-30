import React, { useState } from "react";
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
		<div className="bg-[#1a1b1c] min-h-screen text-white p-4 max-w-[100vw] overflow-x-hidden">
			{/* Header */}
			<div className="flex items-center gap-2 mb-4">
				<img
					src="https://placehold.co/32x32"
					alt="avatar"
					className="rounded-full w-8 h-8"
				/>
				<div className="bg-[#28292b] px-3 py-1 rounded-full flex items-center">
					<span className="font-medium text-white text-sm">Řemmǿřë</span>
					<ChevronRight className="w-4 h-4 text-gray-500 ml-1" />
				</div>
			</div>

			{/* Group Chat Card */}
			<div className="bg-[#28292b] rounded-xl p-4 flex items-center gap-3 mb-4">
				<div className="bg-green-600 rounded-md w-8 h-8 flex items-center justify-center">
					<UserPlus className="text-white w-5 h-5" />
				</div>
				<div>
					<p className="font-medium text-white text-sm">Add to group chat</p>
					<p className="text-xs text-gray-400">
						A collaborative project is created by adding the bot to a Telegram group
					</p>
				</div>
				<span className="ml-auto text-xs text-gray-400">1/2</span>
			</div>

			{/* Add Task Button */}
			<div
				className="flex items-center gap-3 bg-[#28292b] p-3 rounded-xl mb-3 border border-[#3a3b3c] cursor-pointer hover:bg-[#1e1f20] transition-colors"
				onClick={() => setShowAddTask(!showAddTask)}
			>
				<div className="p-2 rounded-md border border-gray-600">
					<Plus className="w-5 h-5 text-gray-400" />
				</div>
				<span className="text-white text-sm">Add Task</span>
			</div>

			{/* Add Task Form with smooth transition */}
			<div
				className={`transition-all duration-300 overflow-hidden ${
					showAddTask ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
				} bg-[#28292b] rounded-xl mb-4 space-y-3`}
			>
				<p className="text-sm text-white">Add task</p>
				<input
					type="text"
					placeholder="Add task"
					className="w-full bg-[#1a1b1c] text-white text-sm placeholder-gray-500 p-2 rounded outline-none"
					value={taskInput}
					onChange={(e) => setTaskInput(e.target.value)}
				/>
				<div className="flex justify-between text-gray-400 text-sm">
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1">
							<CalendarPlus className="w-4 h-4" /> Today
						</div>
						<Repeat className="w-4 h-4" />
					</div>
					<div className="flex gap-3 items-center">
						<Flag className="w-4 h-4" />
						<AlertCircle className="w-4 h-4" />
						<div className="flex items-center gap-1 bg-[#6a0dad] px-2 py-0.5 rounded text-white">
							<Star className="w-4 h-4" /> Pro
						</div>
					</div>
				</div>
				<div className="flex justify-between items-center bg-[#1a1b1c] p-2 rounded mt-2">
					<Inbox className="w-5 h-5 text-gray-400" />
					<button className="bg-white text-black p-2 rounded-full">
						<ChevronRight className="w-5 h-5" />
					</button>
				</div>
			</div>

			{/* Categories List */}
			<div className="bg-[#28292b] rounded-xl p-3 space-y-1">
				{categories.map((cat, i) => (
					<div
						key={i}
						className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1a1b1c] transition-colors cursor-pointer"
					>
						<div className="flex items-center gap-3">
							<div className={`${cat.color} p-1.5 rounded-md`}>
								{React.cloneElement(cat.icon, {
									className: "text-white w-5 h-5",
								})}
							</div>
							<span className="text-white text-sm">{cat.name}</span>
						</div>
						<div className="flex items-center gap-2 text-gray-500 text-sm">
							<span>0</span>
							<ChevronRight className="w-4 h-4" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
