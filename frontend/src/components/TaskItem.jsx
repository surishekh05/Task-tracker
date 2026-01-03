import axios from "axios";
import toast from "react-hot-toast";

export default function TaskItem({ task, refresh }) {
  const toggleStatus = async () => {
    await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
      status: task.status === "Pending" ? "Completed" : "Pending",
    });
    toast.success("Task updated");
    refresh();
  };

  const deleteTask = async () => {
    await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
    toast.success("Task deleted");
    refresh();
  };

  return (
    <div className="border p-3 flex justify-between items-center">
      <div>
        <h3 className="font-bold">{task.title}</h3>

        {/* Status Badge */}
        <span
          className={`text-xs px-2 py-1 rounded ${
            task.status === "Completed"
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="space-x-2">
        <button onClick={toggleStatus} className="text-green-600">✔</button>
        <button onClick={deleteTask} className="text-red-600">✖</button>
      </div>
    </div>
  );
}
