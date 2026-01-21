import TaskCard from "./TaskCard";

function TaskList({ tasks, fetchTasks }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-6">
        <p className="text-lg">📭 No tasks found</p>
        <p className="text-sm mt-1">
          Add a task or try a different search
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 mt-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          fetchTasks={fetchTasks}
        />
      ))}
    </div>
  );
}

export default TaskList;
