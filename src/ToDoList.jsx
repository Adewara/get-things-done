import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import SortableItem from "./components/SortableItem";
import TaskInput from "./components/TaskInput";
import CompletedTasksToggle from "./components/CompletedTasksToggle";

function ToDoList() {
  // Load from localStorage on initial render
  const [activeTasks, setActiveTasks] = useState(() => {
    const saved = localStorage.getItem("activeTasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem("completedTasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [activeTasks, completedTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIndex = activeTasks.findIndex((t) => t.id === active.id);
      const newIndex = activeTasks.findIndex((t) => t.id === over.id);
      const newOrder = [...activeTasks];
      const [moved] = newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, moved);
      setActiveTasks(newOrder);
    }
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setActiveTasks((prev) => [
        ...prev,
        { id: crypto.randomUUID(), text: newTask.trim() },
      ]);
      setNewTask("");
    }
  };

  const deleteTask = (id, isCompleted = false) => {
    if (isCompleted) {
      setCompletedTasks((prev) => prev.filter((task) => task.id !== id));
    } else {
      setActiveTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const toggleTaskStatus = (id, isCompleted = false) => {
    if (isCompleted) {
      const task = completedTasks.find((t) => t.id === id);
      if (task) {
        setCompletedTasks((prev) => prev.filter((t) => t.id !== id));
        setActiveTasks((prev) => [...prev, task]);
      }
    } else {
      const task = activeTasks.find((t) => t.id === id);
      if (task) {
        setActiveTasks((prev) => prev.filter((t) => t.id !== id));
        setCompletedTasks((prev) => [...prev, task]);
      }
    }
  };

  // Rest of your component remains the same...
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-gray-700 mb-6">
          Get Things Done ✅
        </h1>

        <TaskInput newTask={newTask} setNewTask={setNewTask} onAdd={addTask} />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={activeTasks}
            strategy={verticalListSortingStrategy}
          >
            <ol className="mb-4">
              {activeTasks.map((task) => (
                <SortableItem
                  key={task.id}
                  id={task.id}
                  task={task.text}
                  onDelete={() => deleteTask(task.id)}
                  onToggle={() => toggleTaskStatus(task.id)}
                />
              ))}
            </ol>
          </SortableContext>
        </DndContext>

        {completedTasks.length > 0 && (
          <CompletedTasksToggle
            show={showCompleted}
            setShow={setShowCompleted}
            tasks={completedTasks}
            onDelete={(id) => deleteTask(id, true)}
            onToggle={(id) => toggleTaskStatus(id, true)}
          />
        )}
      </div>
    </div>
  );
}

export default ToDoList;
