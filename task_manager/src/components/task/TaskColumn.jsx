// components/task/TaskColumn.jsx
import React from 'react';
import { Plus, Circle } from 'lucide-react';
import TaskCard from './TaskCard';
import { useTaskContext } from '../../hooks/useTaskContext';
import { STATUS_CONFIG } from '../../constants/taskConstants';

const TaskColumn = ({ status, tasks }) => {
  const { draggedTask, moveTask } = useTaskContext();
  
  const statusConfig = STATUS_CONFIG[status];

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== status) {
      moveTask(draggedTask.id, status);
    }
  };

  const handleAddTask = () => {
    // This could open a modal or redirect to add task form
    console.log(`Add task to ${status} column`);
  };

  return (
    <div
      className="bg-gray-50 rounded-lg p-4 min-h-[600px] w-80 flex-shrink-0"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${statusConfig?.color || 'bg-gray-400'}`} />
          <h3 className="font-semibold text-gray-800">
            {statusConfig?.label || status}
          </h3>
          <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        
        <button 
          onClick={handleAddTask}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title={`Add task to ${statusConfig?.label}`}
        >
          <Plus size={18} />
        </button>
      </div>
      
      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
        
        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Circle size={48} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              No tasks in {statusConfig?.label.toLowerCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;