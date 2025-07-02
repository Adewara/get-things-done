function Button({ children, type, onClick }) {
  const baseClass =
    "font-bold text-md py-2 px-4 text-white rounded cursor-pointer transition-colors duration-500 ease-in-out";

  const typeClasses = {
    add: "bg-green-500 hover:bg-green-700",
    delete: "bg-red-500 hover:bg-red-700",
    move: "bg-gray-300 text-black hover:bg-gray-500",
  };

  const buttonText = type === "delete" ? "🗑️" : children;
  const classes = `${baseClass} ${typeClasses[type] || ""}`;

  return (
    <button className={classes} onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default Button;
