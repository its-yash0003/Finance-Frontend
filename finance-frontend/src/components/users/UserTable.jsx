import { useState } from 'react';
import { Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { ROLES, ROLE_LABELS, ROLE_COLORS, STATUS, STATUS_LABELS, STATUS_COLORS } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const UserTable = ({ users, loading, onRoleChange, onStatusChange, onDelete }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDeleteClick = (user) => {
    setDeleteConfirm(user);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      onDelete(deleteConfirm._id || deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  if (loading) {
    return (
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                {['#', 'Name', 'Email', 'Role', 'Status', 'Created At', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array.from({ length: 7 }).map((_, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 bg-slate-800 rounded w-3/4" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return null;
  }

  return (
    <>
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map((user, index) => {
                const isActive = user.status === STATUS.ACTIVE;

                return (
                  <tr
                    key={user._id || user.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-slate-400">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary-400">
                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => onRoleChange(user._id || user.id, e.target.value)}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white
                          focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                      >
                        {Object.entries(ROLES).map(([key, value]) => (
                          <option key={value} value={value}>
                            {ROLE_LABELS[value]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={isActive ? 'active' : 'inactive'}>
                        {STATUS_LABELS[user.status] || user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onStatusChange(user._id || user.id, isActive ? STATUS.INACTIVE : STATUS.ACTIVE)}
                          className="text-slate-400 hover:text-white"
                          title={isActive ? 'Deactivate' : 'Activate'}
                        >
                          {isActive ? (
                            <ToggleRight size={20} className="text-emerald-400" />
                          ) : (
                            <ToggleLeft size={20} className="text-slate-500" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(user)}
                          className="text-slate-400 hover:text-danger"
                          title="Delete user"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete User"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-slate-300">
            Are you sure you want to delete <strong className="text-white">{deleteConfirm?.name}</strong>?
            This action cannot be undone.
          </p>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setDeleteConfirm(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={confirmDelete}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserTable;
