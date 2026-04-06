import { useEffect, useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { useRecords } from '../hooks/useRecords';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../utils/constants';
import RecordFilters from '../components/records/RecordFilters';
import RecordTable from '../components/records/RecordTable';
import RecordForm from '../components/records/RecordForm';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { FileText } from 'lucide-react';

const Records = () => {
  const { user } = useAuth();
  const {
    records,
    loading,
    pagination,
    fetchRecords,
    createRecord,
    updateRecord,
    deleteRecord,
  } = useRecords();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});

  const isAdmin = user?.role === ROLES.ADMIN;

  const loadData = async (page = 1, additionalFilters = {}) => {
    const params = {
      page,
      limit: 10,
      ...filters,
      ...additionalFilters,
    };
    await fetchRecords(params);
    setCurrentPage(page);
  };

  useEffect(() => {
    loadData(1);
  }, []);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    loadData(1, newFilters);
  };

  const handleReset = () => {
    setFilters({});
    loadData(1, {});
  };

  const handleCreate = async (data) => {
    const result = await createRecord(data);
    if (result) {
      setIsFormOpen(false);
      loadData(currentPage);
    }
  };

  const handleUpdate = async (data) => {
    const result = await updateRecord(editingRecord._id || editingRecord.id, data);
    if (result) {
      setIsFormOpen(false);
      setEditingRecord(null);
      loadData(currentPage);
    }
  };

  const handleDelete = async (id) => {
    const success = await deleteRecord(id);
    if (success && records.length === 1 && currentPage > 1) {
      loadData(currentPage - 1);
    } else if (success) {
      loadData(currentPage);
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsFormOpen(true);
  };

  const canEdit = isAdmin;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Records</h2>
          <p className="text-slate-400 text-sm mt-1">
            Manage your financial transactions
          </p>
        </div>
        {canEdit && (
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus size={18} className="mr-2" />
            Add Record
          </Button>
        )}
      </div>

      {/* Filters */}
      <RecordFilters onFilter={handleFilter} onReset={handleReset} />

      {/* Table */}
      <RecordTable
        records={records}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        canEdit={canEdit}
      />

      {/* Empty State */}
      {!loading && (!records || records.length === 0) && (
        <EmptyState
          icon={FileText}
          title="No records found"
          description={
            Object.keys(filters).length > 0
              ? 'Try adjusting your filters or reset them.'
              : canEdit
              ? 'Start by adding your first financial record.'
              : 'No records available at the moment.'
          }
          actionLabel={canEdit && Object.keys(filters).length === 0 ? 'Add Record' : undefined}
          onAction={canEdit && Object.keys(filters).length === 0 ? () => setIsFormOpen(true) : undefined}
        />
      )}

      {/* Pagination */}
      {!loading && records && records.length > 0 && (
        <div className="flex items-center justify-between glass-card p-4">
          <p className="text-sm text-slate-400">
            Showing <span className="text-white font-medium">{records.length}</span> of{' '}
            <span className="text-white font-medium">{pagination.total}</span> records
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => loadData(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              Previous
            </Button>
            <span className="text-sm text-slate-400 px-2">
              Page {currentPage} of {pagination.pages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => loadData(currentPage + 1)}
              disabled={currentPage >= pagination.pages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      <RecordForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingRecord(null);
        }}
        onSubmit={editingRecord ? handleUpdate : handleCreate}
        initialData={editingRecord}
      />
    </div>
  );
};

export default Records;
