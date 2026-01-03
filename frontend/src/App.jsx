import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API = "http://localhost:5000/api/tasks";
const ITEMS_PER_PAGE = 5;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔍 Search + Filter logic
  const filteredTasks = tasks.filter(task => {
    return (
      task.title.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? task.status === statusFilter : true)
    );
  });

  // 📄 Pagination logic
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedTasks = filteredTasks.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Tracker</h1>

      <TaskForm refresh={fetchTasks} />

      {/* Search & Filter */}
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Search task..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
      </div>

      <TaskList tasks={paginatedTasks} refresh={fetchTasks} />

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border ${page === i + 1 ? "bg-blue-500 text-white" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
