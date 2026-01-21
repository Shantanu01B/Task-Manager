import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
function TaskCard({ task, fetchTasks }) {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [loading, setLoading] = useState(false);

  const updateTask = async () => {
    if (!title.trim()) {
      alert("Title cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await axios.put(`${API_URL}/${task._id}`, {
        title,
        status,
      });
      setIsEdit(false);
      fetchTasks();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async () => {
    if (!window.confirm("Delete this task?")) return;

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${task._id}`);
      fetchTasks();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      {isEdit ? (
        <>
          <input
            className="border p-2 w-full mb-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="border p-2 w-full mb-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>Completed</option>
          </select>

          <button
            disabled={loading}
            className="bg-green-600 text-white px-3 py-1 mr-2 rounded disabled:opacity-50"
            onClick={updateTask}
          >
            Save
          </button>

          <button
            className="bg-gray-400 text-white px-3 py-1 rounded"
            onClick={() => setIsEdit(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>

          <p
            className={`text-sm mt-1 font-medium ${
              task.status === "Completed"
                ? "text-green-600"
                : "text-orange-500"
            }`}
          >
            Status: {task.status}
          </p>

          <button
            className="bg-yellow-500 text-white px-3 py-1 mr-2 mt-2 rounded"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>

          <button
            disabled={loading}
            className="bg-red-600 text-white px-3 py-1 mt-2 rounded disabled:opacity-50"
            onClick={deleteTask}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default TaskCard;
