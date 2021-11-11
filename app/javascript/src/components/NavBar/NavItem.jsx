import React from "react";

import { Link } from "react-router-dom";

const NavItem = ({ name, path, style }) => {
  return (
    <Link
      to={path}
      className={`items-center font-semibold inline-flex text-white pl-5 hover:text-lime ${style} `}
    >
      {name}
    </Link>
  );
};

export default NavItem;
