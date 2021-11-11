import React from "react";

import { Loading } from "@bigbinary/neeto-icons";
import PropTypes from "prop-types";

const Button = ({ type = "button", buttonText, loading, style }) => {
  return (
    <div className="mt-6">
      <button
        type={type}
        className={`flex justify-center  px-4 py-2 bg-lime
        font-medium leading-5 transition duration-150
         ease-in-out border border-transparent
         group focus:outline-none w-full hover:bg-black hover:text-lime text-md rounded-lg ${style}`}
      >
        {loading ? <Loading /> : buttonText}
      </button>
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  buttonText: PropTypes.string,
  loading: PropTypes.bool,
};
export default Button;
