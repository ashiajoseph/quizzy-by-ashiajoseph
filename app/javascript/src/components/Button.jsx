import React from "react";

import PropTypes from "prop-types";

const Button = ({ type = "button", buttonText, onClick, loading, style }) => {
  return (
    <div className="mt-6">
      <button
        type={type}
        onClick={onClick}
        className={`flex justify-center  px-4 py-2 bg-lime
        font-medium leading-5 transition duration-150
         ease-in-out border border-transparent rounded-lg
         group focus:outline-none ${style}`}
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
