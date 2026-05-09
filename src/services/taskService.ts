import api from './api';
import type { Task } from '../types';
import { mockTasks } from '../data/mockData';

export const taskService = {
  async getProjectTasks(projectId: string): Promise<Task[]> {
    try {
      const response = await api.get(`/tasks/project/${projectId}`);
      return response.data.data;
    } catch (error) {
      console.warn('Backend unavailable, using mock tasks');
      return mockTasks.filter(t => t.project === projectId);
    }
  },

  async createTask(data: Partial<Task>): Promise<Task> {
    const response = await api.post('/tasks', data);
    return response.data.data;
  },

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const response = await api.patch(`/tasks/${id}`, data);
    return response.data.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  }
};
