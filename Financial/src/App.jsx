import React, { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  PiggyBank,
  Target,
  Plus,
  Filter,
  Calendar,
  Download,
} from "lucide-react";

const FinancialDashboard = () => {
  // Sample data - in a real app, this would come from an API
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2024-08-01",
      description: "Salary",
      amount: 5000,
      category: "Income",
      type: "income",
    },
    {
      id: 2,
      date: "2024-08-02",
      description: "Rent",
      amount: -1200,
      category: "Housing",
      type: "expense",
    },
    {
      id: 3,
      date: "2024-08-03",
      description: "Groceries",
      amount: -150,
      category: "Food",
      type: "expense",
    },
    {
      id: 4,
      date: "2024-08-04",
      description: "Gas",
      amount: -60,
      category: "Transportation",
      type: "expense",
    },
    {
      id: 5,
      date: "2024-08-05",
      description: "Netflix",
      amount: -15,
      category: "Entertainment",
      type: "expense",
    },
    {
      id: 6,
      date: "2024-08-06",
      description: "Freelance",
      amount: 800,
      category: "Income",
      type: "income",
    },
    {
      id: 7,
      date: "2024-08-07",
      description: "Restaurant",
      amount: -45,
      category: "Food",
      type: "expense",
    },
    {
      id: 8,
      date: "2024-08-08",
      description: "Utilities",
      amount: -120,
      category: "Utilities",
      type: "expense",
    },
  ]);

  const [budgets, setBudgets] = useState([
    { category: "Food", budget: 400, spent: 195 },
    { category: "Transportation", budget: 200, spent: 60 },
    { category: "Entertainment", budget: 100, spent: 15 },
    { category: "Utilities", budget: 150, spent: 120 },
    { category: "Housing", budget: 1200, spent: 1200 },
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    category: "Food",
    type: "expense",
  });

  // Calculate key metrics
  const metrics = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const netWorth = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      netWorth,
      savingsRate:
        totalIncome > 0 ? ((netWorth / totalIncome) * 100).toFixed(1) : 0,
    };
  }, [transactions]);

  // Prepare chart data
  const monthlyData = useMemo(() => {
    const groupedData = {};
    transactions.forEach((transaction) => {
      const month = transaction.date.substring(0, 7); // YYYY-MM format
      if (!groupedData[month]) {
        groupedData[month] = { month, income: 0, expenses: 0 };
      }
      if (transaction.type === "income") {
        groupedData[month].income += transaction.amount;
      } else {
        groupedData[month].expenses += Math.abs(transaction.amount);
      }
    });
    return Object.values(groupedData);
  }, [transactions]);

  const categoryData = useMemo(() => {
    const categories = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((transaction) => {
        if (!categories[transaction.category]) {
          categories[transaction.category] = 0;
        }
        categories[transaction.category] += Math.abs(transaction.amount);
      });

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value,
      percentage: ((value / metrics.totalExpenses) * 100).toFixed(1),
    }));
  }, [transactions, metrics.totalExpenses]);

  // Colors for charts
  const COLORS = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
  ];

  const handleAddTransaction = () => {
    if (newTransaction.description && newTransaction.amount) {
      const transaction = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        description: newTransaction.description,
        amount:
          newTransaction.type === "income"
            ? parseFloat(newTransaction.amount)
            : -parseFloat(newTransaction.amount),
        category: newTransaction.category,
        type: newTransaction.type,
      };

      setTransactions((prev) => [transaction, ...prev]);
      setNewTransaction({
        description: "",
        amount: "",
        category: "Food",
        type: "expense",
      });
      setShowAddTransaction(false);
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      if (selectedCategory === "all") return true;
      return transaction.category === selectedCategory;
    });
  }, [transactions, selectedCategory]);

  const categories = [...new Set(transactions.map((t) => t.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Financial Dashboard
          </h1>
          <p className="text-slate-300">
            Track your income, expenses, and financial goals
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-400 outline-none"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-400 outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowAddTransaction(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={16} />
            Add Transaction
          </button>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <DollarSign size={32} />
              <TrendingUp size={20} className="text-blue-200" />
            </div>
            <h3 className="text-lg font-semibold opacity-90">Total Income</h3>
            <p className="text-3xl font-bold">
              ${metrics.totalIncome.toLocaleString()}
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <CreditCard size={32} />
              <TrendingDown size={20} className="text-red-200" />
            </div>
            <h3 className="text-lg font-semibold opacity-90">Total Expenses</h3>
            <p className="text-3xl font-bold">
              ${metrics.totalExpenses.toLocaleString()}
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <PiggyBank size={32} />
              <TrendingUp size={20} className="text-green-200" />
            </div>
            <h3 className="text-lg font-semibold opacity-90">Net Worth</h3>
            <p className="text-3xl font-bold">
              ${metrics.netWorth.toLocaleString()}
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Target size={32} />
              <span className="text-purple-200 text-sm">Goal: 20%</span>
            </div>
            <h3 className="text-lg font-semibold opacity-90">Savings Rate</h3>
            <p className="text-3xl font-bold">{metrics.savingsRate}%</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Income vs Expenses Chart */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">
              Income vs Expenses
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#F3F4F6",
                  }}
                />
                <Bar dataKey="income" fill="#10B981" name="Income" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Categories Pie Chart */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">
              Expense Categories
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#F3F4F6",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget Progress */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6">
            Budget Progress
          </h3>
          <div className="space-y-4">
            {budgets.map((budget, index) => {
              const percentage = (budget.spent / budget.budget) * 100;
              const isOverBudget = percentage > 100;

              return (
                <div key={budget.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">
                      {budget.category}
                    </span>
                    <span className="text-slate-300">
                      ${budget.spent} / ${budget.budget}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${
                        isOverBudget ? "bg-red-500" : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-sm ${
                        isOverBudget ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {percentage.toFixed(1)}% used
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">
              Recent Transactions
            </h3>
            <button className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">
                    Category
                  </th>
                  <th className="text-right py-3 px-4 text-slate-300 font-medium">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.slice(0, 10).map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-slate-700 hover:bg-slate-700 transition-colors"
                  >
                    <td className="py-3 px-4 text-slate-300">
                      {transaction.date}
                    </td>
                    <td className="py-3 px-4 text-white font-medium">
                      {transaction.description}
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {transaction.category}
                    </td>
                    <td
                      className={`py-3 px-4 text-right font-semibold ${
                        transaction.amount > 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}$
                      {Math.abs(transaction.amount).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">
              Add Transaction
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) =>
                    setNewTransaction((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-blue-400 outline-none"
                  placeholder="Enter description"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) =>
                    setNewTransaction((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-blue-400 outline-none"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  value={newTransaction.category}
                  onChange={(e) =>
                    setNewTransaction((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-blue-400 outline-none"
                >
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Housing">Housing</option>
                  <option value="Income">Income</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="expense"
                      checked={newTransaction.type === "expense"}
                      onChange={(e) =>
                        setNewTransaction((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                      className="mr-2"
                    />
                    <span className="text-white">Expense</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="income"
                      checked={newTransaction.type === "income"}
                      onChange={(e) =>
                        setNewTransaction((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                      className="mr-2"
                    />
                    <span className="text-white">Income</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowAddTransaction(false)}
                className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTransaction}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialDashboard;
