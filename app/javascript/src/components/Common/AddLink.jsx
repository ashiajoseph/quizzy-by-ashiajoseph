import React from "react";

import { Link } from "react-router-dom";

const AddLink = ({ heading, name, path }) => {
  return (
    <Link
      to={{ pathname: path, state: heading }}
      className={` font-semibold text-lg text-black rounded-md py-2 px-4 bg-lime `}
    >
      {name}
    </Link>
  );
};

export default AddLink;
