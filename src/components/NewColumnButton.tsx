import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useBoardStore } from '../store/boardStore';

const NewColumnButton: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const { addColumn } = useBoardStore();

  const handleSubmit = () => {
    if (title.trim()) {
      addColumn(title);
      setTitle('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (isAdding) {
    return (
      <div className="flex flex-col h-auto p-3 rounded-lg secondary-bg">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter column title"
          className="w-full p-2 mb-2 border rounded"
          autoFocus
          onKeyDown={handleKeyDown}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="flex-1 p-2 text-sm rounded button"
          >
            Add Column
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="p-2 text-sm border rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className="flex items-center justify-center w-full h-12 p-3 text-sm transition-colors rounded-lg hint-text hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <Plus className="w-5 h-5 mr-2" />
      Add Column
    </button>
  );
};

export default NewColumnButton;