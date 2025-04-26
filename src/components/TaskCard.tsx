import React from "react";
import { Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Draggable } from "@hello-pangea/dnd";
import { useBoardStore } from "../store/boardStore";
import { Task } from "../types";

interface TaskCardProps {
	taskId: string;
	index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ taskId, index }) => {
	// In a real app, you'd fetch task details from the store or an API
	const task: Task = {
		id: taskId,
		title: "Sample Task",
		description: "This is a placeholder task for UI demonstration",
		priority: "medium",
		columnId: "column-1",
		createdBy: 123456789,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	const getPriorityClass = (priority?: string) => {
		switch (priority) {
			case "high":
				return "priority-high";
			case "medium":
				return "priority-medium";
			case "low":
				return "priority-low";
			default:
				return "";
		}
	};

	const getPriorityIcon = (priority?: string) => {
		switch (priority) {
			case "high":
				return <AlertCircle className="w-3 h-3 text-red-500" />;
			case "medium":
				return <AlertCircle className="w-3 h-3 text-amber-500" />;
			case "low":
				return <CheckCircle className="w-3 h-3 text-blue-500" />;
			default:
				return null;
		}
	};

	return (
		<Draggable draggableId={taskId} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={`p-3 mb-2 rounded-lg shadow-sm task-card bg-white dark:bg-gray-800 ${getPriorityClass(
						task.priority
					)}`}
				>
					<h4 className="mb-2 font-medium">{task.title}</h4>

					{task.description && (
						<p className="mb-2 text-xs hint-text">
							{task.description}
						</p>
					)}

					<div className="flex items-center justify-between mt-2">
						{task.dueDate && (
							<div className="flex items-center text-xs hint-text">
								<Calendar className="w-3 h-3 mr-1" />
								{format(new Date(task.dueDate), "MMM d")}
							</div>
						)}

						{task.priority && (
							<div className="flex items-center text-xs">
								{getPriorityIcon(task.priority)}
								<span className="ml-1 hint-text capitalize">
									{task.priority}
								</span>
							</div>
						)}
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default TaskCard;
