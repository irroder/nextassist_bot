import React, { useCallback, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Settings } from "lucide-react";
import { useTelegram } from "../contexts/TelegramContext";
import { useBoardStore } from "../store/boardStore";
import { Board } from "../types";
import Column from "./Column";
import NewColumnButton from "./NewColumnButton";

interface KanbanBoardProps {
	board: Board;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ board }) => {
	const { webApp } = useTelegram();
	const { moveTask } = useBoardStore();

	// Define handlers outside useEffect to maintain reference
	const backButtonHandler = useCallback(() => {
		if (webApp) {
			webApp.close();
		}
	}, [webApp]);

	const mainButtonHandler = useCallback(() => {
		// Open task creation modal or form
		console.log("Create new task clicked");
	}, []);

	// Set up back button and main button
	useEffect(() => {
		if (webApp) {
			// Configure back button
			webApp.backButton.onClick(backButtonHandler);
			webApp.backButton.show();

			// Configure main button for adding new tasks
			webApp.mainButton.text = "New Task";
			webApp.mainButton.show();
			webApp.mainButton.onClick(mainButtonHandler);
		}

		return () => {
			if (webApp) {
				webApp.backButton.offClick(backButtonHandler);
				webApp.backButton.hide();
				webApp.mainButton.offClick(mainButtonHandler);
				webApp.mainButton.hide();
			}
		};
	}, [webApp, backButtonHandler, mainButtonHandler]);

	// Handle drag and drop
	const handleDragEnd = useCallback(
		(result: DropResult) => {
			const { source, destination, draggableId } = result;

			// Dropped outside of a droppable area
			if (!destination) return;

			// Dropped in the same position
			if (
				source.droppableId === destination.droppableId &&
				source.index === destination.index
			)
				return;

			// Move the task
			moveTask(
				draggableId,
				source.droppableId,
				destination.droppableId,
				destination.index
			);
		},
		[moveTask]
	);

	return (
		<div className="flex flex-col h-screen">
			<header className="flex items-center justify-between px-4 py-3 secondary-bg">
				<h1 className="text-lg font-bold">TeamBoard</h1>
				<button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
					<Settings className="w-5 h-5" />
				</button>
			</header>

			<DragDropContext onDragEnd={handleDragEnd}>
				<div className="flex-1 p-2 overflow-x-auto">
					<div className="flex h-full gap-3">
						{board.columns.map((column) => (
							<Droppable key={column.id} droppableId={column.id}>
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className="flex-shrink-0 w-72"
									>
										<Column column={column} />
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						))}

						<div className="flex-shrink-0 w-72">
							<NewColumnButton />
						</div>
					</div>
				</div>
			</DragDropContext>
		</div>
	);
};

export default KanbanBoard;
