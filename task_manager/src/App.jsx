
// App.jsx
import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import { useTaskContext } from './hooks/useTaskContext';
import Header from './components/layout/Header';
import Filters from './components/layout/Filters';
import TaskColumn from './components/task/TaskColumn';
import AddTaskModal from './components/task/AddTaskModal'; // We'll create this
import { TASK_STATUSES } from './constants/taskConstants';

// Main Dashboard Component (consumes context)
const TaskDashboard = () => {
  const { tasksByStatus } = useTaskContext();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddTask = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Header with Stats */}
      <Header onAddTask={handleAddTask} />

      {/* Filters Section */}
      <Filters />

      {/* Kanban Board */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="flex gap-6 overflow-x-auto pb-4">
          <TaskColumn
            status={TASK_STATUSES.TODO}
            tasks={tasksByStatus.todo || []}
          />
          <TaskColumn
            status={TASK_STATUSES.IN_PROGRESS}
            tasks={tasksByStatus['in-progress'] || []}
          />
          <TaskColumn
            status={TASK_STATUSES.REVIEW}
            tasks={tasksByStatus.review || []}
          />
          <TaskColumn
            status={TASK_STATUSES.DONE}
            tasks={tasksByStatus.done || []}
          />
        </div>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={showAddModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

// Root App Component (provides context)
const App = () => {
  return (
    <TaskProvider>
      <TaskDashboard />
    </TaskProvider>
  );
};

export default App;