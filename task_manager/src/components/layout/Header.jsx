// components/layout/Header.jsx
import React from "react";
import { Plus } from "lucide-react";
import { useTaskContext } from "../../hooks/useTaskContext";

const Header = ({ onAddTask }) => {
  const { stats } = useTaskContext();

  const StatCard = ({ label, value, color = "text-gray-900" }) => (
    <div className="text-center">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Title and Add Button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Task Management
            </h1>
            <p className="text-gray-600 text-sm">
              Organize and track your team's progress
            </p>
          </div>

          <button
            onClick={onAddTask}
            className="
              bg-blue-600 hover:bg-blue-700 text-white 
              px-4 py-2 rounded-lg flex items-center gap-2 
              transition-colors duration-200
            "
          >
            <Plus size={18} />
            Add Task
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-6 mt-6">
          <StatCard label="Total Tasks" value={stats.total} />
          <StatCard
            label="Completed"
            value={stats.completed}
            color="text-green-600"
          />
          <StatCard
            label="In Progress"
            value={stats.inProgress}
            color="text-blue-600"
          />
          <StatCard
            label="Overdue"
            value={stats.overdue}
            color="text-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
