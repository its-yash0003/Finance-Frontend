import api from './axios';

export const dashboardApi = {
  /**
   * Get dashboard summary statistics
   * @returns {Promise<{success: boolean, data: {total_income: number, total_expenses: number, net_balance: number, record_count: number}}>}
   */
  getSummary: async () => {
    const response = await api.get('/dashboard/summary');
    return response.data;
  },

  /**
   * Get monthly trends data
   * @returns {Promise<{success: boolean, data: array}>}
   */
  getTrends: async () => {
    const response = await api.get('/dashboard/trends');
    return response.data;
  },

  /**
   * Get breakdown by category
   * @returns {Promise<{success: boolean, data: array}>}
   */
  getByCategory: async () => {
    const response = await api.get('/dashboard/by-category');
    return response.data;
  },

  /**
   * Get recent transactions
   * @returns {Promise<{success: boolean, data: array}>}
   */
  getRecent: async () => {
    const response = await api.get('/dashboard/recent');
    return response.data;
  },
};
