// components/layout/Filters.jsx
import React from "react";
import { Search } from "lucide-react";
import { useTaskContext } from "../../hooks/useTaskContext";
import { FILTER_OPTIONS } from "../../constants/taskConstants";

const Filters = () => {
  const {
    searchTerm,
    setSearchTerm,
    filterPriority,
    setFilterPriority,
    filterAssignee,
    setFilterAssignee,
    assignees,
  } = useTaskContext();

  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex flex-wrap gap-4 items-center bg-white rounded-lg p-4 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1 min-w-64">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks..."
            className="
              w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-200
            "
          />
        </div>

        {/* Priority Filter */}
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="
            px-3 py-2 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            bg-white text-gray-700
          "
        >
          {FILTER_OPTIONS.PRIORITIES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Assignee Filter */}
        <select
          value={filterAssignee}
          onChange={(e) => setFilterAssignee(e.target.value)}
          className="
            px-3 py-2 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            bg-white text-gray-700
          "
        >
          <option value="all">All Assignees</option>
          {assignees.map((assignee) => (
            <option key={assignee} value={assignee}>
              {assignee}
            </option>
          ))}
        </select>

        {/* Active Filters Indicator */}
        {(searchTerm ||
          filterPriority !== "all" ||
          filterAssignee !== "all") && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Filters active:</span>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterPriority("all");
                setFilterAssignee("all");
              }}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
