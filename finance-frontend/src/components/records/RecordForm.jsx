import { useState, useEffect } from 'react';
import { CATEGORIES, RECORD_TYPES } from '../../utils/constants';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RecordForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    amount: '',
    type: RECORD_TYPES.EXPENSE,
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount?.toString() || '',
        type: initialData.type || RECORD_TYPES.EXPENSE,
        category: initialData.category || '',
        date: initialData.date
          ? new Date(initialData.date).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        notes: initialData.notes || '',
      });
    } else {
      setFormData({
        amount: '',
        type: RECORD_TYPES.EXPENSE,
        category: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const getCategories = () => {
    if (formData.type === RECORD_TYPES.INCOME) {
      return CATEGORIES.INCOME;
    }
    return CATEGORIES.EXPENSE;
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const submitData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    onSubmit(submitData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Record' : 'Add New Record'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount */}
        <Input
          label="Amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="Enter amount"
          value={formData.amount}
          onChange={(e) => handleChange('amount', e.target.value)}
          error={errors.amount}
          autoFocus
        />

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Type
          </label>
          <div className="flex gap-2">
            {Object.entries(RECORD_TYPES).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  handleChange('type', value);
                  handleChange('category', '');
                }}
                className={`
                  flex-1 py-2.5 px-4 rounded-lg font-medium transition-all
                  ${formData.type === value
                    ? value === RECORD_TYPES.INCOME
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                  }
                `}
              >
                {key}
              </button>
            ))}
          </div>
          {errors.type && (
            <p className="mt-1 text-sm text-danger">{errors.type}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className={`
              w-full bg-slate-900 border rounded-lg px-4 py-2.5 text-white
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              transition-all duration-200
              ${errors.category ? 'border-danger' : 'border-slate-700'}
            `}
          >
            <option value="">Select category</option>
            {getCategories().map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-danger">{errors.category}</p>
          )}
        </div>

        {/* Date */}
        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => handleChange('date', e.target.value)}
          error={errors.date}
        />

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Notes (optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Add any notes..."
            rows={3}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white
              placeholder-slate-500
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              transition-all duration-200 resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RecordForm;
