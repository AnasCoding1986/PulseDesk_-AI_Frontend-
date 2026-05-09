import api from './api';
import { Project } from '../types';
import { mockProjects } from '../data/mockData';

export const projectService = {
  async getAllProjects(): Promise<Project[]> {
    try {
      const response = await api.get('/projects');
      return response.data.data;
    } catch (error) {
      console.warn('Backend unavailable, using mock projects');
      return mockProjects;
    }
  },

  async getProject(id: string): Promise<Project> {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data.data;
    } catch (error) {
      const mock = mockProjects.find(p => p.id === id);
      if (!mock) throw error;
      return mock;
    }
  },

  async createProject(data: Partial<Project>): Promise<Project> {
    const response = await api.post('/projects', data);
    return response.data.data;
  },

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    const response = await api.patch(`/projects/${id}`, data);
    return response.data.data;
  }
};
