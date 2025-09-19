// context/TaskContext.jsx
import React, { createContext, useState, useCallback, useMemo } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext();

// Sample initial data - in real app, this would come from API
const INITIAL_TASKS = [
  {
    id: "1",
    title: "Design new landing page",
    description:
      "Create wireframes and mockups for the new product landing page",
    status: "todo",
    priority: "high",
    assignee: "John Doe",
    dueDate: "2024-08-30",
    tags: ["design", "ui/ux"],
    createdAt: "2024-08-20",
  },
  {
    id: "2",
    title: "Implement user authentication",
    description: "Set up JWT authentication with login/logout functionality",
    status: "in-progress",
    priority: "high",
    assignee: "Jane Smith",
    dueDate: "2024-08-28",
    tags: ["backend", "security"],
    createdAt: "2024-08-19",
  },
  {
    id: "3",
    title: "Write API documentation",
    description:
      "Document all REST endpoints with examples and response formats",
    status: "in-progress",
    priority: "medium",
    assignee: "Mike Johnson",
    dueDate: "2024-09-05",
    tags: ["documentation"],
    createdAt: "2024-08-18",
  },
  {
    id: "4",
    title: "Setup CI/CD pipeline",
    description: "Configure automated testing and deployment pipeline",
    status: "done",
    priority: "medium",
    assignee: "Sarah Wilson",
    dueDate: "2024-08-25",
    tags: ["devops", "automation"],
    createdAt: "2024-08-15",
  },
  {
    id: "5",
    title: "Code review for payment module",
    description: "Review and test the new payment integration feature",
    status: "review",
    priority: "high",
    assignee: "Alex Brown",
    dueDate: "2024-08-27",
    tags: ["review", "payments"],
    createdAt: "2024-08-22",
  },
];

export const TaskProvider = ({ children }) => {
  // State management
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [draggedTask, setDraggedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterAssignee, setFilterAssignee] = useState("all");

  // Actions
  const moveTask = useCallback((taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }, []);

  const addTask = useCallback((newTask) => {
    const task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTasks((prev) => [task, ...prev]);
  }, []);

  const updateTask = useCallback((taskId, updates) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }, []);

  // Computed values
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority =
        filterPriority === "all" || task.priority === filterPriority;
      const matchesAssignee =
        filterAssignee === "all" || task.assignee === filterAssignee;

      return matchesSearch && matchesPriority && matchesAssignee;
    });
  }, [tasks, searchTerm, filterPriority, filterAssignee]);

  const assignees = useMemo(() => {
    return [...new Set(tasks.map((task) => task.assignee))];
  }, [tasks]);

  const tasksByStatus = useMemo(() => {
    return {
      todo: filteredTasks.filter((task) => task.status === "todo"),
      "in-progress": filteredTasks.filter(
        (task) => task.status === "in-progress"
      ),
      review: filteredTasks.filter((task) => task.status === "review"),
      done: filteredTasks.filter((task) => task.status === "done"),
    };
  }, [filteredTasks]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === "done").length;
    const inProgress = tasks.filter(
      (task) => task.status === "in-progress"
    ).length;
    const overdue = tasks.filter(
      (task) => new Date(task.dueDate) < new Date() && task.status !== "done"
    ).length;

    return { total, completed, inProgress, overdue };
  }, [tasks]);

  // Context value
  const value = {
    // Data
    tasks: filteredTasks,
    tasksByStatus,
    stats,
    assignees,

    // Drag & Drop state
    draggedTask,
    setDraggedTask,

    // Filters
    searchTerm,
    setSearchTerm,
    filterPriority,
    setFilterPriority,
    filterAssignee,
    setFilterAssignee,

    // Actions
    moveTask,
    addTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
