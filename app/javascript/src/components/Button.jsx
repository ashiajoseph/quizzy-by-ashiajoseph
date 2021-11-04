import React from "react";

import PropTypes from "prop-types";

const Button = ({ type = "button", buttonText, onClick, loading }) => {
  return (
    <div className="mt-8">
      <button
        type={type}
        onClick={onClick}
        className="flex justify-center w-full px-4 py-2
        text-md font-medium leading-5 transition duration-150
         ease-in-out bg-lime border border-transparent rounded-lg
         group hover:bg-black hover:text-lime focus:outline-none"
      >
        {loading ? "Loading..." : buttonText}
      </button>
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  buttonText: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};
export default Button;
