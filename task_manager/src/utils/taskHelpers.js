// utils/taskHelpers.js
import { PRIORITY_CONFIG, TASK_PRIORITIES } from '../constants/taskConstants';

/**
 * Get priority configuration for styling
 */
export const getPriorityConfig = (priority) => {
  return PRIORITY_CONFIG[priority] || PRIORITY_CONFIG[TASK_PRIORITIES.MEDIUM];
};

/**
 * Check if a task is overdue
 */
export const isTaskOverdue = (task) => {
  return new Date(task.dueDate) < new Date() && task.status !== 'done';
};

/**
 * Filter tasks by search term
 */
export const filterTasksBySearch = (tasks, searchTerm) => {
  if (!searchTerm) return tasks;
  
  const term = searchTerm.toLowerCase();
  return tasks.filter(task => 
    task.title.toLowerCase().includes(term) ||
    task.description.toLowerCase().includes(term) ||
    task.assignee.toLowerCase().includes(term) ||
    task.tags.some(tag => tag.toLowerCase().includes(term))
  );
};

/**
 * Group tasks by status
 */
export const groupTasksByStatus = (tasks) => {
  return tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {});
};

/**
 * Calculate task statistics
 */
export const calculateTaskStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.status === 'done').length;
  const inProgress = tasks.filter(task => task.status === 'in-progress').length;
  const overdue = tasks.filter(task => isTaskOverdue(task)).length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    inProgress,
    overdue,
    completionRate
  };
};

/**
 * Sort tasks by priority (high -> medium -> low)
 */
export const sortTasksByPriority = (tasks) => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  
  return [...tasks].sort((a, b) => {
    return (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2);
  });
};

/**
 * Validate task data
 */
export const validateTask = (task) => {
  const errors = {};
  
  if (!task.title?.trim()) {
    errors.title = 'Title is required';
  }
  
  if (task.title?.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }
  
  if (!task.assignee?.trim()) {
    errors.assignee = 'Assignee is required';
  }
  
  if (!task.dueDate) {
    errors.dueDate = 'Due date is required';
  }
  
  if (task.dueDate && new Date(task.dueDate) < new Date()) {
    errors.dueDate = 'Due date cannot be in the past';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Generate a unique task ID
 */
export const generateTaskId = () => {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format task for display
 */
export const formatTaskForDisplay = (task) => {
  return {
    ...task,
    formattedDueDate: new Date(task.dueDate).toLocaleDateString(),
    isOverdue: isTaskOverdue(task),
    priorityConfig: getPriorityConfig(task.priority)
  };
};