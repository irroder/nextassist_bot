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
import "./index.css";

const categories = [
	{ name: "All", icon: <CalendarDays />, color: "bg-blue-500", count: 1 },
	{ name: "Inbox", icon: <Inbox />, color: "bg-orange-500", count: 1 },
	{ name: "Today", icon: <CalendarCheck />, color: "bg-green-500", count: 1 },
	{ name: "Tomorrow", icon: <CalendarClock />, color: "bg-red-500", count: 0 },
	{ name: "Next 7 Days", icon: <CalendarDays />, color: "bg-purple-400", count: 0 },
	{ name: "Completed", icon: <CheckCircle />, color: "bg-gray-500", count: 2 },
];

// Пример данных для последнего элемента (можно сделать динамическим)
const sharedList = { name: "Iřřǿđër and Řemmǿřë", members: 2 };

export default function App() {
	const [showAddTask, setShowAddTask] = useState(false);
	const [taskInput, setTaskInput] = useState("");

	const toggleAddTask = () => {
		setShowAddTask(!showAddTask);
	};

	return (
		// Основной фон теперь черный, как на картинке
		<div className="bg-[#000000] min-h-screen text-white p-4 relative max-w-[100vw] overflow-x-hidden font-sans">
			{/* Верхняя панель */}
			<div className="flex justify-between items-center mb-6"> {/* Увеличен отступ снизу */}
				<div className="flex items-center gap-2">
					<img
						// Замените на реальный URL аватара или используйте плейсхолдер
						src="https://via.placeholder.com/32/1E90FF/FFFFFF?text=U"
						alt="avatar"
						className="rounded-full w-8 h-8 border border-gray-700" // Добавлена рамка как на картинке
					/>
					<div className="flex items-center gap-1 bg-[#1c1c1c] px-2 py-1 rounded-lg cursor-pointer"> {/* Фон темнее, скругление больше */}
						<span className="font-semibold text-sm">Iřřǿđër</span> {/* Шрифт и размер */}
						<ChevronRight className="w-4 h-4 text-gray-500" /> {/* Цвет иконки */}
					</div>
				</div>
				<div className="flex items-center gap-1 bg-[#1c1c1c] px-2 py-1 rounded-lg cursor-pointer"> {/* Стиль как у левого элемента */}
					<span className="font-semibold text-sm text-blue-400">Free</span> {/* Цвет текста */}
					<ChevronRight className="w-4 h-4 text-gray-500" />
				</div>
			</div>

            {/* Секция UTASKS NEWS (пример, как на картинке) */}
            <div className="bg-[#1c1c1c] rounded-xl p-3 flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-500 rounded-full p-1.5 flex items-center justify-center w-8 h-8">
                         {/* Иконка самолетика (можно использовать lucide-react или другую библиотеку) */}
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </div>
                     <span className="font-medium text-white text-sm">UTASKS NEWS</span>
                </div>
                <button className="text-blue-400 text-sm font-semibold">Show</button>
            </div>


			{/* Секция Add to group chat */}
			<div className="bg-[#1c1c1c] rounded-xl p-4 flex items-center gap-3 mb-4 cursor-pointer"> {/* Фон темнее, скругление больше */}
				<div className="bg-green-500 rounded-lg w-8 h-8 flex items-center justify-center"> {/* Скругление больше */}
					<UserPlus className="text-white w-5 h-5" />
				</div>
				<div className="flex-grow"> {/* Занимает доступное пространство */}
					<p className="font-medium text-white text-sm">Add to group chat</p> {/* Размер шрифта */}
					<p className="text-xs text-gray-400"> {/* Размер шрифта */}
						A collaborative project is created by adding the bot to
						a Telegram group
					</p>
				</div>
				<span className="ml-auto text-xs text-gray-400">1/2</span> {/* Размер шрифта */}
				<ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" /> {/* Цвет иконки */}
			</div>

			{/* Кнопка/Секция Add Task */}
			{/* Применяем классы для стилизации и анимации */}
			<div
				className={`add-task-button ${showAddTask ? 'open' : ''}`} // Динамические классы для анимации
				onClick={toggleAddTask}
			>
				<div className="flex items-center gap-3">
					{/* Используем цвет фона кнопки для иконки, если она не в "открытом" состоянии */}
					<div className={`p-1.5 rounded-md ${showAddTask ? 'bg-transparent' : 'bg-[#1c1c1c]'}`}>
                         <Plus className="text-gray-400 w-5 h-5" />
                    </div>
					<span className="text-white text-sm">Add Task</span> {/* Размер шрифта */}
				</div>
			</div>

			{/* Контейнер для формы добавления задачи */}
			<div className={`add-task-form-container ${showAddTask ? 'open' : ''}`}>
				{/* Содержимое формы (остается внутри этого div) */}
					{/*<p className="text-sm text-white mb-2">Add task</p> {/* Добавлен отступ */}
					<input
						type="text"
						placeholder="Add task"
                        // Более темный фон для инпута, без рамки, больший отступ
						className="w-full bg-[#121212] text-white p-3 rounded-lg focus:outline-none placeholder-gray-500 mb-3"
						value={taskInput}
						onChange={(e) => setTaskInput(e.target.value)}
					/>
					<div className="flex justify-between items-center text-gray-400 mb-3"> {/* Отступ снизу */}
						<div className="flex gap-4 items-center">
                            {/* Кнопки действий */}
							<button className="flex items-center gap-1 text-blue-400 bg-[#2a2a2a] px-2 py-1 rounded-md text-xs hover:bg-[#3a3a3a]">
								<CalendarPlus className="w-4 h-4" /> Today
							</button>
							<button className="text-gray-400 bg-[#2a2a2a] p-1 rounded-md hover:bg-[#3a3a3a]">
                                <Repeat className="w-4 h-4" />
                            </button>
						</div>
						<div className="flex gap-3 items-center">
                             <button className="text-gray-400 bg-[#2a2a2a] p-1 rounded-md hover:bg-[#3a3a3a]">
							    <Flag className="w-4 h-4" />
                             </button>
                             <button className="text-gray-400 bg-[#2a2a2a] p-1 rounded-md hover:bg-[#3a3a3a]">
							    <AlertCircle className="w-4 h-4" />
                            </button>
							<div className="flex items-center gap-1 bg-purple-600 px-1.5 py-0.5 rounded text-white text-xs"> {/* Фиолетовый цвет для Pro */}
								<Star className="w-3 h-3" /> Pro {/* Иконка чуть меньше */}
							</div>
						</div>
					</div>
					<div className="flex items-center justify-between bg-[#121212] p-2 rounded-lg"> {/* Темный фон, скругление */}
						<div className="flex items-center gap-2">
                            <Inbox className="w-5 h-5 text-orange-500" /> {/* Оранжевая иконка Inbox */}
                            <span className="text-sm text-white">Inbox</span>
                        </div>
						<button className="bg-blue-500 text-white p-1.5 rounded-full w-7 h-7 flex items-center justify-center hover:bg-blue-600"> {/* Синяя кнопка отправки */}
							{/* Иконка отправки (самолетик) */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
						</button>
					</div>
			</div>
            {/* </AnimatePresence> */} {/* AnimatePresence больше не нужен для этой анимации */}

			{/* Список категорий */}
			<div className="bg-[#1c1c1c] rounded-xl p-1 space-y-0.5"> {/* Уменьшен padding, добавлен space-y для тонких разделителей */}
				{categories.map((cat, i) => (
					<div
						key={i}
                        // Убраны внутренние отступы p-3, hover эффект темнее
						className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer hover:bg-[#2c2c2c] transition-colors"
					>
						<div className="flex items-center gap-3">
							<div className={`${cat.color} p-1.5 rounded-lg w-8 h-8 flex items-center justify-center`}> {/* Увеличен размер иконки, скругление */}
								{React.cloneElement(cat.icon, {
									className: "text-white w-5 h-5", // Размер иконки внутри
								})}
							</div>
							<span className="text-white text-sm">{cat.name}</span> {/* Размер шрифта */}
						</div>
						<div className="flex items-center gap-2 text-gray-500">
							<span className="text-sm">{cat.count}</span> {/* Размер шрифта */}
							<ChevronRight className="w-4 h-4" />
						</div>
					</div>
				))}
			</div>

             {/* Последний элемент списка (Shared List) */}
             <div className="bg-[#1c1c1c] rounded-xl p-1 mt-4"> {/* Отступ сверху */}
                 <div className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer hover:bg-[#2c2c2c] transition-colors">
                     <div className="flex items-center gap-3">
                         <div className={`bg-gray-700 p-1.5 rounded-lg w-8 h-8 flex items-center justify-center`}>
                             {/* Иконка инициалов или аватаров */}
                             <span className="text-white text-xs font-bold">IA</span>
                         </div>
                         <span className="text-white text-sm">{sharedList.name}</span>
                     </div>
                     <div className="flex items-center gap-2 text-gray-500">
                         {/* Иконка участников */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                         <span className="text-sm">{sharedList.members}</span>
                         <ChevronRight className="w-4 h-4" />
                     </div>
                 </div>
             </div>

            {/* Плавающая кнопка добавления */}
            <button className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors">
                 <Plus className="w-7 h-7" />
            </button>

		</div>
	);
}

