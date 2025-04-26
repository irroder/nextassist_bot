import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useBoardStore } from '../store/boardStore';
import { useTelegram } from '../contexts/TelegramContext';
import { Task, User } from '../types';

interface NewTaskModalProps {
  columnId: string;
  onClose: () => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ columnId, onClose }) => {
  const { user } = useTelegram();
  const { addTask } = useBoardStore();
  const [taskData, setTaskData] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: undefined,
    dueDate: undefined,
    assigneeId: undefined
  });

  // Mock data for assignees (in a real app, this would be fetched from the API)
  const assignees: User[] = [
    { id: 1, firstName: 'John', lastName: 'Manager', role: 'manager' },
    { id: 2, firstName: 'Jane', lastName: 'Assistant', role: 'assistant' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskData.title?.trim() || !user) return;

    addTask(columnId, {
      ...taskData,
      createdBy: user.id,
      columnId
    }).then(() => {
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md overflow-y-auto rounded-lg bg-white dark:bg-gray-800">
        <button
          onClick={onClose}
          className="absolute p-1 rounded-full top-3 right-3 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-4">
          <h2 className="mb-4 text-xl font-semibold">Create New Task</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={taskData.title || ''}
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Description</label>
              <textarea
                value={taskData.description || ''}
                onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Priority</label>
              <select
                value={taskData.priority || ''}
                onChange={(e) => setTaskData({
                  ...taskData,
                  priority: e.target.value ? e.target.value as 'low' | 'medium' | 'high' : undefined
                })}
                className="w-full p-2 border rounded"
              >
                <option value="">None</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Due Date</label>
              <input
                type="date"
                value={taskData.dueDate ? new Date(taskData.dueDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setTaskData({
                  ...taskData,
                  dueDate: e.target.value ? new Date(e.target.value).toISOString() : undefined
                })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Assignee</label>
              <select
                value={taskData.assigneeId || ''}
                onChange={(e) => setTaskData({
                  ...taskData,
                  assigneeId: e.target.value ? parseInt(e.target.value) : undefined
                })}
                className="w-full p-2 border rounded"
              >
                <option value="">Unassigned</option>
                {assignees.map((assignee) => (
                  <option key={assignee.id} value={assignee.id}>
                    {assignee.firstName} {assignee.lastName} ({assignee.role})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm rounded button"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;