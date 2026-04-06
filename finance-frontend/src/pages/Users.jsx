import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import UserTable from '../components/users/UserTable';
import UserForm from '../components/users/UserForm';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { Users as UsersIcon } from 'lucide-react';
import { STATUS } from '../utils/constants';
import toast from 'react-hot-toast';

const Users = () => {
  const {
    users,
    loading,
    fetchUsers,
    createUser,
    updateUserRole,
    updateUserStatus,
    deleteUser,
  } = useUsers();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreate = async (data) => {
    const result = await createUser(data);
    if (result) {
      setIsFormOpen(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    const result = await updateUserRole(userId, newRole);
    if (!result) {
      // Revert on failure - will be handled by the hook's local state management
      toast.error('Failed to update role');
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    const result = await updateUserStatus(userId, newStatus);
    if (!result) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (userId) => {
    const success = await deleteUser(userId);
    if (success) {
      // User already removed from state in the hook
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Users</h2>
          <p className="text-slate-400 text-sm mt-1">
            Manage user accounts and permissions
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus size={18} className="mr-2" />
          Add User
        </Button>
      </div>

      {/* Table */}
      <UserTable
        users={users}
        loading={loading}
        onRoleChange={handleRoleChange}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      {/* Empty State */}
      {!loading && (!users || users.length === 0) && (
        <EmptyState
          icon={UsersIcon}
          title="No users found"
          description="Start by adding your first user to the system."
          actionLabel="Add User"
          onAction={() => setIsFormOpen(true)}
        />
      )}

      {/* Add/Edit Form Modal */}
      <UserForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleCreate}
        initialData={editingUser}
      />
    </div>
  );
};

export default Users;
