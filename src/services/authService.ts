import api from './api';
import type { User } from '../types';

export const authService = {
  async login(credentials: any): Promise<{ user: User; token: string }> {
    const response = await api.post('/auth/login', credentials);
    const { user, token } = response.data.data;
    localStorage.setItem('token', token);
    return { user, token };
  },

  async register(data: any): Promise<{ user: User; token: string }> {
    const response = await api.post('/auth/register', data);
    const { user, token } = response.data.data;
    localStorage.setItem('token', token);
    return { user, token };
  },

  logout() {
    localStorage.removeItem('token');
  }
};
