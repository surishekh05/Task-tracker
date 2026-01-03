import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function TaskForm({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
  });

  const isValid = form.title && form.dueDate;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/tasks", form);
      toast.success("Task added successfully");
      setForm({ title: "", description: "", priority: "Low", dueDate: "" });
      refresh();
    } catch {
      toast.error("Failed to add task");
    }
  };

  return (
    <form onSubmit={submitHandler} className="mb-4 space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Task Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        type="date"
        className="border p-2 w-full"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
      />

      <select
        className="border p-2 w-full"
        value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button
        disabled={!isValid}
        className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50"
      >
        Add Task
      </button>
    </form>
  );
}
