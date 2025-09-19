// constants/taskConstants.js

export const TASK_STATUSES = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  REVIEW: 'review',
  DONE: 'done'
};

export const TASK_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

export const STATUS_CONFIG = {
  [TASK_STATUSES.TODO]: { 
    color: 'bg-gray-500', 
    label: 'To Do',
    bgColor: 'bg-gray-50'
  },
  [TASK_STATUSES.IN_PROGRESS]: { 
    color: 'bg-blue-500', 
    label: 'In Progress',
    bgColor: 'bg-blue-50'
  },
  [TASK_STATUSES.REVIEW]: { 
    color: 'bg-yellow-500', 
    label: 'Review',
    bgColor: 'bg-yellow-50'
  },
  [TASK_STATUSES.DONE]: { 
    color: 'bg-green-500', 
    label: 'Done',
    bgColor: 'bg-green-50'
  }
};

export const PRIORITY_CONFIG = {
  [TASK_PRIORITIES.HIGH]: {
    color: 'border-red-500 bg-red-50',
    textColor: 'text-red-500',
    icon: 'AlertCircle'
  },
  [TASK_PRIORITIES.MEDIUM]: {
    color: 'border-yellow-500 bg-yellow-50',
    textColor: 'text-yellow-500',
    icon: 'Clock'
  },
  [TASK_PRIORITIES.LOW]: {
    color: 'border-green-500 bg-green-50',
    textColor: 'text-green-500',
    icon: 'CheckCircle2'
  }
};

export const FILTER_OPTIONS = {
  PRIORITIES: [
    { value: 'all', label: 'All Priorities' },
    { value: TASK_PRIORITIES.HIGH, label: 'High Priority' },
    { value: TASK_PRIORITIES.MEDIUM, label: 'Medium Priority' },
    { value: TASK_PRIORITIES.LOW, label: 'Low Priority' }
  ]
};

export const DEFAULT_TASK = {
  title: '',
  description: '',
  status: TASK_STATUSES.TODO,
  priority: TASK_PRIORITIES.MEDIUM,
  assignee: '',
  dueDate: '',
  tags: []
};