 import React, { useState, useRef } from "react";
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
  const addTaskRef = useRef(null);

  const toggleAddTask = () => {
  setShowAddTask(!showAddTask);
  if (addTaskRef.current) {
  if (!showAddTask) {
  addTaskRef.current.classList.add("slide-in");
  addTaskRef.current.classList.remove("slide-out");
  } else {
  addTaskRef.current.classList.add("slide-out");
  addTaskRef.current.classList.remove("slide-in");
  }
  }
  };

  return (
  <div className="bg-[#000000] min-h-screen text-white p-4 relative max-w-[100vw] overflow-x-hidden">
  <div className="flex justify-between items-center mb-4">
  <div className="flex items-center gap-2">
  <img
  src="https://placehold.co/32x32"
  alt="avatar"
  className="rounded-full w-8 h-8"
  />
  <div className="flex items-center gap-1 bg-[#121212] px-2 py-1 rounded">
  <span className="font-semibold">Řemmǿřë</span>
  <ChevronRight className="w-4 h-4 text-gray-400" />
  </div>
  </div>
  <div className="bg-[#121212] px-2 py-1 rounded text-white font-semibold">
  Free >
  </div>
  </div>

  <div className="bg-[#121212] rounded-xl p-4 flex items-center gap-3 mb-4">
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
  <span className="ml-auto text-sm text-gray-400">1/2</span>
  <ChevronRight className="ml-2 w-4 h-4 text-gray-400" />
  </div>

  <div
  className="flex items-center bg-[#121212] p-3 rounded-xl cursor-pointer mb-3 relative overflow-hidden transition-all duration-300 ease-in-out"
  onClick={toggleAddTask}
  ref={addTaskRef}
  >
  <div className="flex items-center gap-3 w-full">
  <div className="bg-[#121212] p-1.5 rounded-md border border-gray-600">
  <Plus className="text-gray-400 w-5 h-5" />
  </div>
  <span className="text-white">Add Task</span>
  </div>
  </div>

  {showAddTask && (
  <div className="bg-[#121212] rounded-xl p-4 mb-4 space-y-3 overflow-hidden shadow-lg" style={{position:'absolute', top: 'calc(100% - 10px)', left: 0, width: '100%', maxWidth: '100vw', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}>
  <p className="text-sm text-white">Add task</p>
  <input
  type="text"
  placeholder="Add task"
  className="w-full bg-[#121212] text-white p-2 rounded"
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
  <div className="flex items-center justify-between bg-[#121212] p-2 rounded">
  <Inbox className="w-5 h-5 text-gray-400" />
  <button className="bg-white text-black p-2 rounded-full">
  <ChevronRight className="w-5 h-5" />
  </button>
  </div>
  </div>
  )}

  <div className="bg-[#121212] rounded-xl p-3 space-y-1">
  {categories.map((cat, i) => (
  <div
  key={i}
  className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-[#2c2c2c] transition-colors"
  >
  <div className="flex items-center gap-3">
  <div className={`${cat.color} p-1.5 rounded-md`}>
  {React.cloneElement(cat.icon, {
  className: "text-white w-5 h-5",
  })}
  </div>
  <span className="text-white">{cat.name}</span>
  </div>
  <div className="flex items-center gap-2 text-gray-500">
  <span>1</span>
  <ChevronRight className="w-4 h-4" />
  </div>
  </div>
  ))}
  </div>
  </div>
  );
 }
