import { useState, useCallback } from 'react';
import { recordsApi } from '../api/recordsApi';
import toast from 'react-hot-toast';

export const useRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
  });

  const fetchRecords = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await recordsApi.getAll(params);
      setRecords(response.data.records || []);
      setPagination({
        total: response.data.total || 0,
        page: response.data.page || 1,
        pages: response.data.pages || 1,
      });
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch records';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecordById = useCallback(async (id) => {
    try {
      const response = await recordsApi.getById(id);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch record';
      toast.error(message);
      return null;
    }
  }, []);

  const createRecord = useCallback(async (recordData) => {
    try {
      const response = await recordsApi.create(recordData);
      toast.success('Record created successfully');
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create record';
      toast.error(message);
      return null;
    }
  }, []);

  const updateRecord = useCallback(async (id, recordData) => {
    try {
      const response = await recordsApi.update(id, recordData);
      toast.success('Record updated successfully');
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update record';
      toast.error(message);
      return null;
    }
  }, []);

  const deleteRecord = useCallback(async (id) => {
    try {
      await recordsApi.delete(id);
      toast.success('Record deleted successfully');
      // Remove from local state
      setRecords((prev) => prev.filter((record) => record._id !== id && record.id !== id));
      setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
      return true;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete record';
      toast.error(message);
      return false;
    }
  }, []);

  const clearRecords = useCallback(() => {
    setRecords([]);
    setPagination({ total: 0, page: 1, pages: 1 });
    setError(null);
  }, []);

  return {
    records,
    loading,
    error,
    pagination,
    fetchRecords,
    getRecordById,
    createRecord,
    updateRecord,
    deleteRecord,
    clearRecords,
  };
};
