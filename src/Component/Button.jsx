import React from "react";

function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#f97316] hover:bg-[#fb923c] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
