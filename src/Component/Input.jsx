import React, { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    label,
    type = "text",
    name,
    placeholder = "",
    className = "",
    required = false,
    ...props // Includes value, onChange, etc.
  },
  ref
) {
  const id = useId();

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 text-sm font-medium text-[#7c2d12]"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2 border border-[#f97316] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fb923c] text-[#7c2d12] placeholder-[#a16207] ${className}`}
        {...props} // ✅ Pass remaining props (like from register)
      />
    </div>
  );
});

export default Input;
