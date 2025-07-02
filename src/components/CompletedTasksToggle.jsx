import React from "react";
import CompletedItem from "./CompletedItem";
import PropTypes from "prop-types";

function CompletedTasksToggle({ show, setShow, tasks, onDelete, onToggle }) {
  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded px-3 py-1 transition-all duration-300"
        aria-expanded={show}
        aria-label={`${show ? "Hide" : "Show"} completed tasks`}
      >
        {show ? "Hide" : "Show"} Completed Tasks
        <span
          className={`transform transition-transform duration-300 ${
            show ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      <div
        className={`transition-all duration-500 overflow-hidden ${
          show ? "max-h-[1000px] mt-2" : "max-h-0"
        }`}
      >
        <ol>
          {tasks.map((task) => (
            <CompletedItem
              key={task.id}
              task={task}
              onDelete={() => onDelete(task.id, true)}
              onToggle={() => onToggle(task.id, true)}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

CompletedTasksToggle.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default CompletedTasksToggle;
