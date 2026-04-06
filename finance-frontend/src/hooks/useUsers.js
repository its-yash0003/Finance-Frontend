import { useState, useCallback } from 'react';
import { usersApi } from '../api/usersApi';
import toast from 'react-hot-toast';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await usersApi.getAll();
      setUsers(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch users';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserById = useCallback(async (id) => {
    try {
      const response = await usersApi.getById(id);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch user';
      toast.error(message);
      return null;
    }
  }, []);

  const createUser = useCallback(async (userData) => {
    try {
      const response = await usersApi.create(userData);
      toast.success('User created successfully');
      // Add to local state
      setUsers((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create user';
      toast.error(message);
      return null;
    }
  }, []);

  const updateUserRole = useCallback(async (id, role) => {
    try {
      const response = await usersApi.updateRole(id, role);
      toast.success('User role updated');
      // Update local state
      setUsers((prev) =>
        prev.map((user) =>
          (user._id === id || user.id === id) ? { ...user, role } : user
        )
      );
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update user role';
      toast.error(message);
      return null;
    }
  }, []);

  const updateUserStatus = useCallback(async (id, status) => {
    try {
      const response = await usersApi.updateStatus(id, status);
      toast.success('User status updated');
      // Update local state
      setUsers((prev) =>
        prev.map((user) =>
          (user._id === id || user.id === id) ? { ...user, status } : user
        )
      );
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update user status';
      toast.error(message);
      return null;
    }
  }, []);

  const deleteUser = useCallback(async (id) => {
    try {
      await usersApi.delete(id);
      toast.success('User deleted successfully');
      // Remove from local state
      setUsers((prev) => prev.filter((user) => user._id !== id && user.id !== id));
      return true;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete user';
      toast.error(message);
      return false;
    }
  }, []);

  const clearUsers = useCallback(() => {
    setUsers([]);
    setError(null);
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    getUserById,
    createUser,
    updateUserRole,
    updateUserStatus,
    deleteUser,
    clearUsers,
  };
};
