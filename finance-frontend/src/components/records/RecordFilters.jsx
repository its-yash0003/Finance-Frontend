import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { CATEGORIES, RECORD_TYPES, RECORD_TYPE_LABELS } from '../../utils/constants';
import Button from '../ui/Button';
import Input from '../ui/Input';

const allCategories = [...CATEGORIES.INCOME, ...CATEGORIES.EXPENSE];

const RecordFilters = ({ onFilter, onReset }) => {
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    from: '',
    to: '',
  });

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      type: '',
      category: '',
      from: '',
      to: '',
    });
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              transition-all duration-200"
          >
            <option value="">All Types</option>
            {Object.entries(RECORD_TYPE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              transition-all duration-200"
          >
            <option value="">All Categories</option>
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* From Date */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            From
          </label>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => handleChange('from', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              transition-all duration-200
              [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
          />
        </div>

        {/* To Date */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            To
          </label>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => handleChange('to', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              transition-all duration-200
              [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
          />
        </div>

        {/* Search Button */}
        <div className="flex items-end gap-2">
          <Button type="submit" className="flex-1">
            <Search size={18} className="mr-2" />
            Search
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="px-3"
          >
            <X size={18} />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RecordFilters;
