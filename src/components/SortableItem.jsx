import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Button from "./Button";

function SortableItem({ id, task, onDelete, onToggle }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between bg-white text-gray-800 rounded-md p-4 shadow mb-2"
    >
      <label className="flex items-center gap-2 flex-1 cursor-pointer">
        <input type="checkbox" onChange={onToggle} className="w-5 h-5" />
        <span className="text-lg">{task}</span>
      </label>
      <div className="flex items-center gap-2">
        <Button type="delete" onClick={onDelete} />
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab text-xl select-none"
          title="Drag to reorder"
        >
          ☰
        </span>
      </div>
    </li>
  );
}

export default SortableItem;
