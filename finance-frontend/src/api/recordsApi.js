import api from './axios';

export const recordsApi = {
  /**
   * Get all records with pagination and filters
   * @param {object} params
   * @param {string} params.type - 'income' or 'expense'
   * @param {string} params.category
   * @param {string} params.from - start date
   * @param {string} params.to - end date
   * @param {number} params.page
   * @param {number} params.limit
   * @returns {Promise<{success: boolean, data: {records: array, total: number, page: number, pages: number}}>}
   */
  getAll: async (params = {}) => {
    const response = await api.get('/records', { params });
    return response.data;
  },

  /**
   * Get a single record by ID
   * @param {string} id
   * @returns {Promise<{success: boolean, data: object}>}
   */
  getById: async (id) => {
    const response = await api.get(`/records/${id}`);
    return response.data;
  },

  /**
   * Create a new record
   * @param {object} recordData
   * @param {number} recordData.amount
   * @param {string} recordData.type - 'income' or 'expense'
   * @param {string} recordData.category
   * @param {string} recordData.date
   * @param {string} recordData.notes
   * @returns {Promise<{success: boolean, data: object}>}
   */
  create: async (recordData) => {
    const response = await api.post('/records', recordData);
    return response.data;
  },

  /**
   * Update an existing record
   * @param {string} id
   * @param {object} recordData
   * @returns {Promise<{success: boolean, data: object}>}
   */
  update: async (id, recordData) => {
    const response = await api.put(`/records/${id}`, recordData);
    return response.data;
  },

  /**
   * Delete a record
   * @param {string} id
   * @returns {Promise<{success: boolean}>}
   */
  delete: async (id) => {
    const response = await api.delete(`/records/${id}`);
    return response.data;
  },
};
