import React from "react";
import {
  MoreHorizontal,
  Calendar,
  User,
  AlertCircle,
  Clock,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { useTaskContext } from "../../hooks/useTaskContext";
import { isTaskOverdue, getPriorityConfig } from "../../utils/taskHelpers";

const TaskCard = ({ task }) => {
  const { setDraggedTask } = useTaskContext();

  const handleDragStart = (e) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const priorityConfig = getPriorityConfig(task.priority);
  const overdue = isTaskOverdue(task);

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <AlertCircle size={16} className="text-red-500" />;

      case "medium":
        return <Clock size={16} className="text-yellow-500" />;

      case "low":
        return <CheckCircle2 size={16} className="text-green-500" />;

      default:
        return <Circle size={16} className="text-gray-400" />;
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`
        bg-white rounded-lg shadow-sm border-l-4 p-4 mb-3 
        cursor-move hover:shadow-md transition-all duration-200 
        ${priorityConfig.color}
      `}
    >
      {/* Card header */}
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-900 text-sm leading-tight">
          {task.title}
        </h4>
        <button className="text-gray-400 hover:text-gray-600 p-1">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-xs mb-3 line-clamp-2">
        {task.description}
      </p>

      {/*
        Fixed: The property should be 'tags' (array), not 'tag'.
        The previous code would throw an error if 'tag' is undefined.
      */}
      <div className="flex flex-wrap gap-1 mb-3">
        {Array.isArray(task.tags) &&
          task.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
      </div>

      {/* Priority and due date */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center gap-2">
          {getPriorityIcon(task.priority)}
          <span className="capitalize">{task.priority}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={12} />
          <span className={overdue ? "text-red-500 font-medium" : ""}>
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Assignee */}
      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
        <User size={12} className="text-gray-400" />
        <span className="text-xs text-gray-600">{task.assignee}</span>
      </div>
    </div>
  );
};

export default TaskCard;
