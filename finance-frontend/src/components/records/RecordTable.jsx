import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { RECORD_TYPES, RECORD_TYPE_COLORS } from '../../utils/constants';
import { formatCurrencyFull, formatDate } from '../../utils/formatters';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const RecordTable = ({
  records,
  loading,
  onEdit,
  onDelete,
  canEdit = false,
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDeleteClick = (record) => {
    setDeleteConfirm(record);
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
                {['#', 'Date', 'Category', 'Type', 'Amount', 'Notes', 'Actions'].map((h) => (
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

  if (!records || records.length === 0) {
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
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Notes</th>
                {canEdit && (
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {records.map((record, index) => {
                const isIncome = record.type === RECORD_TYPES.INCOME;

                return (
                  <tr
                    key={record._id || record.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-slate-400">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-white">{formatDate(record.date)}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{record.category}</td>
                    <td className="px-6 py-4">
                      <Badge variant={isIncome ? 'income' : 'expense'}>
                        {isIncome ? 'Income' : 'Expense'}
                      </Badge>
                    </td>
                    <td className={`px-6 py-4 text-sm font-semibold ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isIncome ? '+' : '-'}{formatCurrencyFull(record.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400 max-w-xs truncate">
                      {record.notes || '-'}
                    </td>
                    {canEdit && (
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(record)}
                            className="text-slate-400 hover:text-white"
                          >
                            <Edit2 size={18} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(record)}
                            className="text-slate-400 hover:text-danger"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </td>
                    )}
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
        title="Delete Record"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-slate-300">
            Are you sure you want to delete this record? This action cannot be undone.
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

export default RecordTable;
