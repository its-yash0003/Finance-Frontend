export const ROLES = {
  ADMIN: 'admin',
  ANALYST: 'analyst',
  VIEWER: 'viewer',
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Admin',
  [ROLES.ANALYST]: 'Analyst',
  [ROLES.VIEWER]: 'Viewer',
};

export const ROLE_COLORS = {
  [ROLES.ADMIN]: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  [ROLES.ANALYST]: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  [ROLES.VIEWER]: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

export const RECORD_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

export const RECORD_TYPE_LABELS = {
  [RECORD_TYPES.INCOME]: 'Income',
  [RECORD_TYPES.EXPENSE]: 'Expense',
};

export const RECORD_TYPE_COLORS = {
  [RECORD_TYPES.INCOME]: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  [RECORD_TYPES.EXPENSE]: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

export const CATEGORIES = {
  INCOME: [
    'Salary',
    'Freelance',
    'Investments',
    'Gifts',
    'Rental Income',
    'Business Income',
    'Other Income',
  ],
  EXPENSE: [
    'Food & Dining',
    'Transportation',
    'Utilities',
    'Entertainment',
    'Shopping',
    'Healthcare',
    'Education',
    'Travel',
    'Personal Care',
    'Home & Garden',
    'Insurance',
    'Subscriptions',
    'Other Expense',
  ],
};

export const CATEGORY_ICONS = {
  Salary: 'briefcase',
  Freelance: 'laptop',
  Investments: 'trending-up',
  Gifts: 'gift',
  'Rental Income': 'home',
  'Business Income': 'building',
  'Other Income': 'plus-circle',
  'Food & Dining': 'utensils',
  Transportation: 'car',
  Utilities: 'zap',
  Entertainment: 'film',
  Shopping: 'shopping-bag',
  Healthcare: 'heart',
  Education: 'book',
  Travel: 'plane',
  'Personal Care': 'user',
  'Home & Garden': 'home',
  Insurance: 'shield',
  Subscriptions: 'repeat',
  'Other Expense': 'minus-circle',
};

export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export const STATUS_LABELS = {
  [STATUS.ACTIVE]: 'Active',
  [STATUS.INACTIVE]: 'Inactive',
};

export const STATUS_COLORS = {
  [STATUS.ACTIVE]: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  [STATUS.INACTIVE]: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

export const DATE_FORMATS = {
  DISPLAY: 'dd MMM yyyy',
  INPUT: 'yyyy-MM-dd',
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50],
};
