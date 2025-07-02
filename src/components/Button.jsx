function Button({ children, type, onClick }) {
  if (type === "add")
    return (
      <button
        className="text-bold text-md py-2 px-4 text-white border-none rounded cursor-pointer transition-colors duration-500 ease-in-out bg-green-400 hover:bg-green-600"
        onClick={onClick}
      >
        {children}{" "}
      </button>
    );

  if (type === "delete")
    return (
      <button
        className="text-bold text-md py-2 px-4 text-white border-none rounded cursor-pointer transition-colors duration-500 ease-in-out bg-red-400 hover:bg-red-600"
        onClick={onClick}
      >
        {children}{" "}
      </button>
    );

  if (type === "move")
    return (
      <button
        className="text-bold text-md py-2 px-4 text-white border-none rounded cursor-pointer transition-colors duration-500 ease-in-out bg-gray-300 hover:bg-gray-500"
        onClick={onClick}
      >
        {children}{" "}
      </button>
    );
}

export default Button;
