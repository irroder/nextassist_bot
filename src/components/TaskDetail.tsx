import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MessageSquare, User, X, Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Task, Comment, User as UserType } from '../types';
import { useTelegram } from '../contexts/TelegramContext';
import { useBoardStore } from '../store/boardStore';

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onClose }) => {
  const { user } = useTelegram();
  const { updateTask, removeTask, addComment } = useBoardStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  const [newComment, setNewComment] = useState('');

  // Initialize the edited task with the current task
  useEffect(() => {
    setEditedTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      assigneeId: task.assigneeId
    });
  }, [task]);

  const handleSave = () => {
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      removeTask(task.id);
      onClose();
    }
  };

  const handleSubmitComment = () => {
    if (newComment.trim() && user) {
      addComment(task.id, newComment, user.id);
      setNewComment('');
    }
  };

  // Mock data for assignees (in a real app, this would be fetched from the API)
  const assignees: UserType[] = [
    { id: 1, firstName: 'John', lastName: 'Manager', role: 'manager' },
    { id: 2, firstName: 'Jane', lastName: 'Assistant', role: 'assistant' }
  ];

  // Mock data for comments (in a real app, this would be fetched from the API)
  const comments: Comment[] = task.comments || [
    {
      id: '1',
      taskId: task.id,
      userId: 1,
      text: 'This is a sample comment',
      createdAt: new Date().toISOString()
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg bg-white dark:bg-gray-800">
        <button
          onClick={onClose}
          className="absolute p-1 rounded-full top-3 right-3 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-4">
          {isEditing ? (
            // Editing mode
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={editedTask.title || ''}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Description</label>
                <textarea
                  value={editedTask.description || ''}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Priority</label>
                <select
                  value={editedTask.priority || ''}
                  onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
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
                  value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Assignee</label>
                <select
                  value={editedTask.assigneeId || ''}
                  onChange={(e) => setEditedTask({ ...editedTask, assigneeId: e.target.value ? parseInt(e.target.value) : undefined })}
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
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-sm border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 text-sm rounded button"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            // Viewing mode
            <>
              <div className="flex justify-between">
                <h2 className="mb-2 text-xl font-semibold">{task.title}</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="p-1 text-red-500 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {task.description && (
                <p className="mb-4 text-sm hint-text">{task.description}</p>
              )}

              <div className="grid grid-cols-2 gap-3 mb-6">
                {task.assigneeId && (
                  <div className="flex items-center text-sm hint-text">
                    <User className="w-4 h-4 mr-2" />
                    <span>
                      {assignees.find(a => a.id === task.assigneeId)?.firstName || 'Unknown'}
                    </span>
                  </div>
                )}

                {task.priority && (
                  <div className="flex items-center text-sm hint-text">
                    <span className={`w-2 h-2 mr-2 rounded-full ${
                      task.priority === 'high' ? 'bg-red-500' : 
                      task.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}></span>
                    <span className="capitalize">{task.priority}</span>
                  </div>
                )}

                {task.dueDate && (
                  <div className="flex items-center text-sm hint-text">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                  </div>
                )}

                <div className="flex items-center text-sm hint-text">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Created {format(new Date(task.createdAt), 'MMM d')}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t">
                <h3 className="flex items-center mb-3 text-sm font-medium">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Comments
                </h3>

                <div className="space-y-3 mb-4">
                  {comments.length === 0 ? (
                    <p className="text-sm hint-text">No comments yet</p>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="p-2 text-sm rounded-lg secondary-bg">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">
                            {assignees.find(a => a.id === comment.userId)?.firstName || 'Unknown'}
                          </span>
                          <span className="text-xs hint-text">
                            {format(new Date(comment.createdAt), 'MMM d, HH:mm')}
                          </span>
                        </div>
                        <p>{comment.text}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 p-2 text-sm border rounded"
                  />
                  <button
                    onClick={handleSubmitComment}
                    className="px-3 py-1 text-sm rounded button"
                    disabled={!newComment.trim()}
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;