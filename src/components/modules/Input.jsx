import React, { forwardRef } from "react";

const Input = forwardRef(({ label, value, onChange, onFocus, onBlur, type = "text" }, ref) => {
  return (
    <div className="relative w-48 lg:w-77">
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        onFocus={onFocus}
        onBlur={onBlur}
        className="max-h-12 peer w-full border border-ocean/50 rounded-xl px-3 pt-6 pb-2 text-sm
                   focus:outline-none focus:border-ocean focus:ring-1 focus:ring-ocean
                   bg-white transition-all duration-300"
      />
      <label
        className="absolute left-3 top-[0.9px] text-gray-500 text-sm transition-all duration-300 
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                   peer-placeholder-shown:text-gray-400
                   peer-focus:top-[-0.5rem] peer-focus:text-sm peer-focus:text-ocean bg-white px-1"
      >
        <span className="text-sm">{label}</span>
      </label>
    </div>
  );
});

export default Input;
