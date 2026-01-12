import api from './api';
import type { User, CreateUserRequest, UpdateUserRequest } from '../types/userTypes';

export const userService = {
    async getUsers(): Promise<User[]> {
        const response = await api.get<User[]>('/users');
        return response.data;
    },

    async getUserById(id: number): Promise<User> {
        const response = await api.get<User>(`/users/${id}`);
        return response.data;
    },

    async createUser(data: CreateUserRequest): Promise<User> {
        const response = await api.post<User>('/users', data);
        return response.data;
    },

    async updateUser(id: number, data: UpdateUserRequest): Promise<User> {
        const response = await api.put<User>(`/users/${id}`, data);
        return response.data;
    },

    async deleteUser(id: number): Promise<void> {
        await api.delete(`/users/${id}`);
    },
};
