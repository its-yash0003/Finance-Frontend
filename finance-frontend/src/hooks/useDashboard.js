import { useState, useCallback } from 'react';
import { dashboardApi } from '../api/dashboardApi';
import toast from 'react-hot-toast';

export const useDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await dashboardApi.getSummary();
      setSummary(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch summary';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTrends = useCallback(async () => {
    try {
      const response = await dashboardApi.getTrends();
      setTrends(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch trends';
      setError(message);
      console.error('Failed to fetch trends:', err);
      return null;
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await dashboardApi.getByCategory();
      setCategories(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch categories';
      setError(message);
      console.error('Failed to fetch categories:', err);
      return null;
    }
  }, []);

  const fetchRecent = useCallback(async () => {
    try {
      const response = await dashboardApi.getRecent();
      setRecent(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch recent transactions';
      setError(message);
      console.error('Failed to fetch recent transactions:', err);
      return null;
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [summaryRes, trendsRes, categoriesRes, recentRes] = await Promise.all([
        dashboardApi.getSummary(),
        dashboardApi.getTrends(),
        dashboardApi.getByCategory(),
        dashboardApi.getRecent(),
      ]);

      setSummary(summaryRes.data);
      setTrends(trendsRes.data);
      setCategories(categoriesRes.data);
      setRecent(recentRes.data);

      return {
        summary: summaryRes.data,
        trends: trendsRes.data,
        categories: categoriesRes.data,
        recent: recentRes.data,
      };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch dashboard data';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearData = useCallback(() => {
    setSummary(null);
    setTrends([]);
    setCategories([]);
    setRecent([]);
    setError(null);
  }, []);

  return {
    summary,
    trends,
    categories,
    recent,
    loading,
    error,
    fetchSummary,
    fetchTrends,
    fetchCategories,
    fetchRecent,
    fetchAllData,
    clearData,
  };
};
