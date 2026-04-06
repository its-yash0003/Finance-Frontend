import api from './axios';

export const authApi = {
  /**
   * Login user with email and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{success: boolean, data: {token: string, user: object}}>}
   */
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  /**
   * Register a new user
   * @param {object} userData
   * @param {string} userData.name
   * @param {string} userData.email
   * @param {string} userData.password
   * @param {string} userData.role
   * @returns {Promise<{success: boolean, data: object}>}
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  /**
   * Get current user profile
   * @returns {Promise<{success: boolean, data: object}>}
   */
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
