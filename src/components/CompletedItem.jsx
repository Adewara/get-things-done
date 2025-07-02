import Button from "./Button";

function CompletedItem({ task, onDelete, onToggle }) {
  return (
    <li className="flex items-center justify-between bg-gray-100 text-gray-500 line-through rounded-md p-4 shadow mb-2">
      <label className="flex items-center gap-2 flex-1 cursor-pointer">
        <input
          type="checkbox"
          checked
          onChange={onToggle}
          className="w-5 h-5"
        />
        <span className="text-lg">{task.text}</span>{" "}
      </label>
      <Button type="delete" onClick={onDelete} />
    </li>
  );
}

export default CompletedItem;
