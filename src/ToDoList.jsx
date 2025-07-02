import { useState } from "react";
import Button from "./components/Button";

function ToDoList() {
  const [tasks, setTasks] = useState([
    "First Task",
    "Second Task",
    "Third Task",
  ]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  function addTask() {
    if (newTask.trim(" ") !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {}

  function moveTaskUp(index) {}

  function moveTaskDown(index) {}

  return (
    <div className="text-center mt-24">
      <h1 className="text-[4rem]">Get Things Done</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          className="text-2xl"
        />

        <Button type="add" onClick={addTask}>
          Add Task
        </Button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task}</span>
            <Button type="delete" onClick={() => deleteTask(index)}>
              Delete
            </Button>
            <Button type="move" onClick={() => moveTaskUp(index)}>
              👆
            </Button>
            <Button type="move" onClick={() => moveTaskDown(index)}>
              👇
            </Button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
