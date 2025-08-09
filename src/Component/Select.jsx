import React, { useId, forwardRef } from "react";

const Select = forwardRef(function Select(
  { label, name, value, onChange, options = [], className = "", required = false },
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
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        ref={ref}
        className={`w-full px-4 py-2 border border-[#f97316] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fb923c] text-[#7c2d12] bg-white ${className}`}
      >
        <option value="">Select an option</option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
