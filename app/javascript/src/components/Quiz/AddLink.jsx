import React from "react";

import { Link } from "react-router-dom";

const AddLink = ({ name, path, style, handleClick }) => {
  return (
    <Link
      to={path}
      className={` font-semibold text-lg text-black rounded-md py-2 px-4 bg-lime ${style} `}
      onClick={handleClick}
    >
      {name}
    </Link>
  );
};

export default AddLink;
