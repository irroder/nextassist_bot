import React, { useState } from 'react';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Column as ColumnType } from '../types';
import TaskCard from './TaskCard';
import { useBoardStore } from '../store/boardStore';

interface ColumnProps {
  column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const { updateColumn, removeColumn } = useBoardStore();

  const handleUpdateTitle = () => {
    if (title.trim() && title !== column.title) {
      updateColumn(column.id, title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUpdateTitle();
    }
  };

  return (
    <div className="flex flex-col h-full pb-2 rounded-lg secondary-bg">
      <div className="relative flex items-center justify-between p-3">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleUpdateTitle}
            onKeyDown={handleKeyDown}
            className="w-full p-1 text-sm border rounded"
            autoFocus
          />
        ) : (
          <h3 className="font-semibold">{column.title}</h3>
        )}

        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {showMenu && (
          <div className="absolute right-0 z-10 w-48 mt-1 overflow-hidden bg-white rounded-md shadow-lg top-full dark:bg-gray-800">
            <button
              onClick={() => {
                setIsEditing(true);
                setShowMenu(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit column
            </button>
            <button
              onClick={() => removeColumn(column.id)}
              className="flex items-center w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete column
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 px-2 overflow-y-auto">
        {column.taskIds.map((taskId, index) => (
          <TaskCard key={taskId} taskId={taskId} index={index} />
        ))}
      </div>

      <div className="px-3 mt-2">
        <button
          className="flex items-center justify-center w-full p-2 text-sm border border-dashed rounded-md hint-text hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => console.log('Add task to', column.id)}
        >
          + Add a task
        </button>
      </div>
    </div>
  );
};

export default Column;