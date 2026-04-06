import { DATE_FORMATS } from './constants';

/**
 * Format a number as Indian currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string with ₹ symbol
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '₹0';

  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numericAmount)) return '₹0';

  // Indian number formatting
  const absAmount = Math.abs(numericAmount);
  let formatted;

  if (absAmount >= 10000000) {
    // Crores
    formatted = (absAmount / 10000000).toFixed(2) + ' Cr';
  } else if (absAmount >= 100000) {
    // Lakhs
    formatted = (absAmount / 100000).toFixed(2) + ' L';
  } else if (absAmount >= 1000) {
    // Thousands
    formatted = (absAmount / 1000).toFixed(2) + ' K';
  } else {
    formatted = absAmount.toFixed(2);
  }

  const symbol = numericAmount < 0 ? '-₹' : '₹';
  return `${symbol}${formatted}`;
};

/**
 * Format a number with full Indian numbering system
 * @param {number} amount - The amount to format
 * @returns {string} Fully formatted currency string
 */
export const formatCurrencyFull = (amount) => {
  if (amount === null || amount === undefined) return '₹0.00';

  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numericAmount)) return '₹0.00';

  const absAmount = Math.abs(numericAmount);
  const sign = numericAmount < 0 ? '-' : '';

  // Split into integer and decimal parts
  const [intPart, decPart] = absAmount.toFixed(2).split('.');

  // Indian numbering: last 3 digits, then groups of 2
  const lastThree = intPart.slice(-3);
  const remaining = intPart.slice(0, -3);
  const withCommas = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',');

  const formatted = withCommas ? `${withCommas},${lastThree}` : lastThree;

  return `${sign}₹${formatted}.${decPart}`;
};

/**
 * Format a date string or Date object
 * @param {string|Date} date - The date to format
 * @param {string} format - Format string (default: 'dd MMM yyyy')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = DATE_FORMATS.DISPLAY) => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return '';

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en-US', { month: 'short' });
  const year = dateObj.getFullYear();

  if (format === DATE_FORMATS.DISPLAY) {
    return `${day} ${month} ${year}`;
  }

  if (format === DATE_FORMATS.INPUT) {
    return dateObj.toISOString().split('T')[0];
  }

  return dateObj.toLocaleDateString('en-IN');
};

/**
 * Format a date with time
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date with time
 */
export const formatDateTime = (date) => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return '';

  return dateObj.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Get relative time string
 * @param {string|Date} date - The date to format
 * @returns {string} Relative time string (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();

  if (isNaN(dateObj.getTime())) return '';

  const diffMs = now - dateObj;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return formatDate(date);
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncate = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
