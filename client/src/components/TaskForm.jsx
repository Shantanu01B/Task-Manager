import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      setLoading(true);
      await axios.post(API_URL, {
        title,
        description,
        status: "Pending",
      });

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task", err);
      alert("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-gray-50 border border-gray-200 p-5 rounded-lg mb-6"
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        ➕ Add New Task
      </h2>

      <input
        type="text"
        placeholder="Task title"
        className="border border-gray-300 p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Task description (optional)"
        className="border border-gray-300 p-2 w-full mb-4 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition disabled:opacity-50"
      >
        {loading ? "Adding Task..." : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;
