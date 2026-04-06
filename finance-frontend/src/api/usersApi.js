import api from './axios';

export const usersApi = {
  /**
   * Get all users
   * @returns {Promise<{success: boolean, data: array}>}
   */
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  /**
   * Get a single user by ID
   * @param {string} id
   * @returns {Promise<{success: boolean, data: object}>}
   */
  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  /**
   * Create a new user
   * @param {object} userData
   * @param {string} userData.name
   * @param {string} userData.email
   * @param {string} userData.password
   * @param {string} userData.role
   * @returns {Promise<{success: boolean, data: object}>}
   */
  create: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  /**
   * Update user role
   * @param {string} id
   * @param {string} role
   * @returns {Promise<{success: boolean, data: object}>}
   */
  updateRole: async (id, role) => {
    const response = await api.patch(`/users/${id}/role`, { role });
    return response.data;
  },

  /**
   * Update user status
   * @param {string} id
   * @param {string} status - 'active' or 'inactive'
   * @returns {Promise<{success: boolean, data: object}>}
   */
  updateStatus: async (id, status) => {
    const response = await api.patch(`/users/${id}/status`, { status });
    return response.data;
  },

  /**
   * Delete a user
   * @param {string} id
   * @returns {Promise<{success: boolean}>}
   */
  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};
