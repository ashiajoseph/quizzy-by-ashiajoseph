import React, { useRef, useEffect } from "react";

import PropTypes from "prop-types";

const Input = ({
  from = "login",
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  name,
  required = true,
  style,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (from != "login") inputRef.current.focus();
  }, []);
  return (
    <div className="mt-6">
      {label && (
        <label
          className="block text-md font-medium
              leading-5 text-gray-800"
        >
          {label}
        </label>
      )}
      <div className="mt-1 rounded-sm shadow-sm">
        <input
          ref={inputRef}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          className={`block w-full  px-3 py-2 placeholder-gray-400
          transition duration-150 ease-in-out border
          border-gray-300 rounded-md appearance-none
          focus:outline-none focus:shadow-outline-black
          focus:border-black sm:text-sm sm:leading-5 ${style}`}
        />
      </div>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.node,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default Input;
