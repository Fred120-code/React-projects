// dateHelpers.js
// Utility functions for date manipulation in the task_manager React app

/**
 * Formats a date string or Date object to 'YYYY-MM-DD' format.
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Checks if a given date is today.
 * @param {string|Date} date
 * @returns {boolean}
 */
export function isToday(date) {
  const today = new Date();
  const d = new Date(date);
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

/**
 * Returns the difference in days between two dates.
 * @param {string|Date} date1
 * @param {string|Date} date2
 * @returns {number}
 */
export function daysBetween(date1, date2) {
  const d1 = new Date(formatDate(date1));
  const d2 = new Date(formatDate(date2));
  const diffTime = d2 - d1;
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Adds days to a given date and returns the new date in 'YYYY-MM-DD' format.
 * @param {string|Date} date
 * @param {number} days
 * @returns {string}
 */
export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return formatDate(d);
}

/**
 * Checks if a date is in the past (before today).
 * @param {string|Date} date
 * @returns {boolean}
 */
export function isPast(date) {
  const d = new Date(formatDate(date));
  const today = new Date(formatDate(new Date()));
  return d < today;
}
