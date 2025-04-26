import { create } from 'zustand';
import { Board, Column, Task, Comment } from '../types';
import { api } from '../services/api';

interface BoardState {
  board: Board | null;
  loading: boolean;
  error: string | null;
  
  // Board actions
  fetchBoard: (chatId: number) => Promise<void>;
  addColumn: (title: string) => Promise<void>;
  updateColumn: (columnId: string, title: string) => Promise<void>;
  removeColumn: (columnId: string) => Promise<void>;
  reorderColumns: (columnId: string, newOrder: number) => Promise<void>;
  
  // Task actions
  addTask: (columnId: string, task: Partial<Task>) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
  moveTask: (taskId: string, sourceColumnId: string, destinationColumnId: string, newIndex: number) => Promise<void>;
  
  // Comment actions
  addComment: (taskId: string, text: string, userId: number) => Promise<void>;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: null,
  loading: false,
  error: null,
  
  fetchBoard: async (chatId: number) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/boards/${chatId}`);
      set({ board: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to load board', loading: false });
      console.error('Error fetching board:', error);
    }
  },
  
  addColumn: async (title: string) => {
    set({ loading: true, error: null });
    const { board } = get();
    if (!board) return;
    
    try {
      const response = await api.post(`/boards/${board.chatId}/columns`, { title });
      const newColumn = response.data;
      
      set({ 
        board: { 
          ...board, 
          columns: [...board.columns, newColumn] 
        }, 
        loading: false 
      });
    } catch (error) {
      set({ error: 'Failed to add column', loading: false });
      console.error('Error adding column:', error);
    }
  },
  
  updateColumn: async (columnId: string, title: string) => {
    set({ loading: true, error: null });
    const { board } = get();
    if (!board) return;
    
    try {
      await api.put(`/boards/${board.chatId}/columns/${columnId}`, { title });
      
      set({ 
        board: { 
          ...board, 
          columns: board.columns.map(col => 
            col.id === columnId ? { ...col, title } : col
          ) 
        }, 
        loading: false 
      });
    } catch (error) {
      set({ error: 'Failed to update column', loading: false });
      console.error('Error updating column:', error);
    }
  },
  
  removeColumn: async (columnId: string) => {
    set({ loading: true, error: null });
    const { board } = get();
    if (!board) return;
    
    try {
      await api.delete(`/boards/${board.chatId}/columns/${columnId}`);
      
      set({ 
        board: { 
          ...board, 
          columns: board.columns.filter(col => col.id !== columnId) 
        }, 
        loading: false 
      });
    } catch (error) {
      set({ error: 'Failed to remove column', loading: false });
      console.error('Error removing column:', error);
    }
  },
  
  reorderColumns: async (columnId: string, newOrder: number) => {
    set({ loading: true, error: null });
    const { board } = get();
    if (!board) return;
    
    try {
      await api.put(`/boards/${board.chatId}/columns/${columnId}/order`, { order: newOrder });
      
      // Sort columns by order
      const updatedColumns = [...board.columns];
      const movedColumn = updatedColumns.find(col => col.id === columnId);
      
      if (movedColumn) {
        // Remove the column from its current position
        const filteredColumns = updatedColumns.filter(col => col.id !== columnId);
        
        // Update the order of all affected columns
        const reorderedColumns = [
          ...filteredColumns.slice(0, newOrder),
          { ...movedColumn, order: newOrder },
          ...filteredColumns.slice(newOrder)
        ].map((col, index) => ({ ...col, order: index }));
        
        set({ 
          board: { 
            ...board, 
            columns: reorderedColumns 
          }, 
          loading: false 
        });
      }
    } catch (error) {
      set({ error: 'Failed to reorder columns', loading: false });
      console.error('Error reordering columns:', error);
    }
  },
  
  addTask: async (columnId: string, taskData: Partial<Task>) => {
    set({ loading: true, error: null });
    const { board } = get();
    if (!board) return;
    
    try {
      const response = await api.post(`/boards/${board.chatId}/columns/${columnId}/tasks`, taskData);
      const newTask = response.data;
      
      set({ 
        board: { 
          ...board, 
          columns: board.columns.map(col => 
            col.id === columnId 
              ? { ...col, taskIds: [...col.taskIds, newTask.id] } 
              : col
          ) 
        }, 
        loading: false 
      });
    } catch (error) {
      set({ error: 'Failed to add task', loading: false });
      console.error('Error adding task:', error);
    }
  },
  
  updateTask: async (taskId: string, updates: Partial<Task>) => {
    set({ loading: true, error: null });
    const { board } = get();
    if (!board) return;
    
    try {
      await api.put(`/boards/${board.chatId}/tasks/${taskId}`, updates);
      
      // Find the column that contains this task
      const columnWithTask = board.columns.find(col => 
        col.taskIds.includes(taskId)
      );
      
      if (columnWithTask) {
        set({ 
          board: { 
            ...board, 
            // If the column ID changed, move the task to the new column
            columns: updates.columnId && updates.columnId !== columnWithTask.id
              ? board.columns.map(col => {
                  if (col.id === columnWithTask.id) {
                    return { ...col, taskIds: col.taskIds.filter(id => id !== taskId) };
                  }
                  if (col.id === updates.columnId) {
                    return { ...col, taskIds: [...col.taskIds, taskId] };
                  }
                  return col;
                })
              : board.columns
          }, 
          loading: false 
        });
      }
    } catch (error) {
      set({ error: 'Failed to update task', loading: false });
      console.error('Error updating task:', error);
    }
  },
  
  removeTask: async (taskId: string) => {
    set({ loading: true, error: null });
    const { board } = get();
    if (!board) return;
    
    try {
      await api.delete(`/boards/${board.chatId}/tasks/${taskId}`);
      
      set({ 
        board: { 
          ...board, 
          columns: board.columns.map(col => ({
            ...col,
            taskIds: col.taskIds.filter(id => id !== taskId)
          }))
        }, 
        loading: false 
      });
    } catch (error) {
      set({ error: 'Failed to remove task', loading: false });
      console.error('Error removing task:', error);
    }
  },
  
  moveTask: async (taskId: string, sourceColumnId: string, destinationColumnId: string, newIndex: number) => {
    set({ loading: true, error: null });
    const { board } = get();
    if (!board) return;
    
    try {
      await api.put(`/boards/${board.chatId}/tasks/${taskId}/move`, {
        sourceColumnId,
        destinationColumnId,
        position: newIndex
      });
      
      set({ 
        board: { 
          ...board, 
          columns: board.columns.map(col => {
            // Remove from source column
            if (col.id === sourceColumnId) {
              return {
                ...col,
                taskIds: col.taskIds.filter(id => id !== taskId)
              };
            }
            // Add to destination column at the specified position
            if (col.id === destinationColumnId) {
              const newTaskIds = [...col.taskIds];
              newTaskIds.splice(newIndex, 0, taskId);
              return {
                ...col,
                taskIds: newTaskIds
              };
            }
            return col;
          })
        }, 
        loading: false 
      });
    } catch (error) {
      set({ error: 'Failed to move task', loading: false });
      console.error('Error moving task:', error);
    }
  },
  
  addComment: async (taskId: string, text: string, userId: number) => {
    set({ loading: true, error: null });
    const { board } = get();
    if (!board) return;
    
    try {
      const response = await api.post(`/boards/${board.chatId}/tasks/${taskId}/comments`, {
        text,
        userId
      });
      
      const newComment = response.data;
      set({ loading: false });
      
      return newComment;
    } catch (error) {
      set({ error: 'Failed to add comment', loading: false });
      console.error('Error adding comment:', error);
    }
  }
}));