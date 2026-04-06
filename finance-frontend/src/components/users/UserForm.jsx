import { useState, useEffect } from 'react';
import { ROLES, ROLE_LABELS } from '../../utils/constants';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

const UserForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ROLES.VIEWER,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        password: '',
        role: initialData.role || ROLES.VIEWER,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: ROLES.VIEWER,
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!isEdit && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isEdit && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
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

    const submitData = { ...formData };
    if (isEdit && !submitData.password) {
      delete submitData.password;
    }

    onSubmit(submitData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit User' : 'Add New User'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <Input
          label="Name"
          type="text"
          placeholder="Enter full name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          autoFocus
        />

        {/* Email */}
        <Input
          label="Email"
          type="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
        />

        {/* Password */}
        <Input
          label={isEdit ? 'New Password (leave empty to keep current)' : 'Password'}
          type="password"
          placeholder={isEdit ? 'Enter new password' : 'Enter password'}
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
          showPasswordToggle
        />

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
            className={`
              w-full bg-slate-900 border rounded-lg px-4 py-2.5 text-white
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              transition-all duration-200
              ${errors.role ? 'border-danger' : 'border-slate-700'}
            `}
          >
            {Object.entries(ROLES).map(([key, value]) => (
              <option key={value} value={value}>
                {ROLE_LABELS[value]}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-danger">{errors.role}</p>
          )}
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

export default UserForm;
