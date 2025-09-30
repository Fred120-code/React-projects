import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  Calendar,
  Tag,
  Search,
  Filter,
} from "lucide-react";

function App() {
  //State variables
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    text: "",
    category: "personal",
    dueDate: "",
    priority: "medium",
  });

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = [
    {
      value: "personal",
      label: "Personal",
      color: "bg-blue-100 text-blue-800",
    },
    { value: "work", label: "Work", color: "bg-green-100 text-green-800" },
    { value: "health", label: "Health", color: "bg-red-100 text-red-800" },
    {
      value: "shopping",
      label: "Shopping",
      color: "bg-purple-100 text-purple-800",
    },
    {
      value: "education",
      label: "Education",
      color: "bg-yellow-100 text-yellow-800",
    },
  ];

  const priorities = [
    { value: "low", label: "Low", color: "border-l-green-400" },
    { value: "medium", label: "Medium", color: "border-l-yellow-400" },
    { value: "high", label: "High", color: "border-l-red-400" },
  ];

  //Load the todos from the local storage
  useEffect(() => {
    // Fixed: Added try/catch to handle corrupted or invalid JSON in localStorage
    try {
      const saved = localStorage.getItem("todos");
      const savedTodos = saved ? JSON.parse(saved) : [];
      setTodos(Array.isArray(savedTodos) ? savedTodos : []);
    } catch (err) {
      setTodos([]); // fallback to empty list if error
      // Optionally, you could log the error: console.error("Failed to load todos from localStorage", err);
    }
  }, []);

  //Saving the todos to the local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //Function that handles the addition of the todos to the list
  const addTodo = () => {
    if (newTodo.text.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.text.trim(),
        completed: false,
        category: newTodo.category,
        dueDate: newTodo.dueDate,
        priority: newTodo.priority,
        createdAt: new Date().toISOString(),
      };
      setTodos([todo, ...todos]);
      setNewTodo({
        text: "",
        category: "personal",
        dueDate: "",
        priority: "medium",
      });
      setShowAddForm(false);
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //Edit functions

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && todo.completed) ||
      (filter === "pending" && !todo.completed) ||
      (filter === "overdue" && isOverdue(todo.dueDate) && !todo.completed);
    return matchesSearch && matchesFilter;
  });

  const getCategoryInfo = (category) => {
    return categories.find((cat) => cat.value === category) || categories[0];
  };

  const getPriorityInfo = (priority) => {
    return priorities.find((p) => p.value === priority) || priorities[1];
  };

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
    overdue: todos.filter((t) => isOverdue(t.dueDate) && !t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Tasks</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.completed}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.pending}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-600">
                {stats.overdue}
              </div>
              <div className="text-sm text-gray-600">Overdue</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add Task</span>
              </button>
            </div>
          </div>

          {/* Add Task Form */}
          {showAddForm && (
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Enter task description..."
                  value={newTodo.text}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, text: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  // Fixed: Replaced deprecated onKeyPress with onKeyDown for React 17+ compatibility
                  onKeyDown={(e) => e.key === "Enter" && addTodo()}
                />
                <select
                  value={newTodo.category}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, category: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={newTodo.dueDate}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, dueDate: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <select
                  value={newTodo.priority}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, priority: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {priorities.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addTodo}
                  disabled={!newTodo.text.trim()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  Add Task
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-gray-400 text-lg">
                {searchTerm || filter !== "all"
                  ? "No tasks match your filters"
                  : "No tasks yet. Add one above!"}
              </div>
            </div>
          ) : (
            filteredTodos.map((todo) => {
              const categoryInfo = getCategoryInfo(todo.category);
              const priorityInfo = getPriorityInfo(todo.priority);
              const overdue = isOverdue(todo.dueDate) && !todo.completed;

              return (
                <div
                  key={todo.id}
                  className={`bg-white rounded-xl shadow-lg border-l-4 ${
                    priorityInfo.color
                  } p-4 transition-all hover:shadow-xl ${
                    todo.completed ? "opacity-75" : ""
                  } ${overdue ? "bg-red-50" : ""}`}
                >
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        todo.completed
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-300 hover:border-green-500"
                      }`}
                    >
                      {todo.completed && <Check className="w-4 h-4" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      {editingId === todo.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            // Fixed: Replaced deprecated onKeyPress with onKeyDown for React 17+ compatibility
                            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                          />
                          <button
                            onClick={saveEdit}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div
                            className={`text-lg ${
                              todo.completed
                                ? "line-through text-gray-500"
                                : "text-gray-800"
                            }`}
                          >
                            {todo.text}
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {categoryInfo.label}
                            </span>
                            {todo.dueDate && (
                              <span
                                className={`inline-flex items-center text-xs ${
                                  overdue
                                    ? "text-red-600 font-medium"
                                    : "text-gray-500"
                                }`}
                              >
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(todo.dueDate).toLocaleDateString()}
                                {overdue && " (Overdue)"}
                              </span>
                            )}
                            <span className="text-xs text-gray-400">
                              {priorityInfo.label} Priority
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => startEdit(todo.id, todo.text)}
                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
