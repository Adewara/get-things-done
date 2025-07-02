import Button from "./Button";

function TaskInput({ newTask, setNewTask, onAdd }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Enter a task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-1 p-3 rounded-md text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <Button type="add" onClick={onAdd}>
        Add Task
      </Button>
    </div>
  );
}

export default TaskInput;
