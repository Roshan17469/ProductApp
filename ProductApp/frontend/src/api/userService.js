import apiClient from './axios'

export const userService = {
  getAllUsers: () => apiClient.get('/users'),
  
  getUserById: (id) => apiClient.get(`/users/${id}`),
  
  createUser: (userData) => apiClient.post('/users', userData),
  
  updateUser: (id, userData) => apiClient.put(`/users/${id}`, userData),
  
  deleteUser: (id) => apiClient.delete(`/users/${id}`),
}

