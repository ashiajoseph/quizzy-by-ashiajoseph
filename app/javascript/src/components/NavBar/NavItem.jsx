import React from "react";

import { Link } from "react-router-dom";

const NavItem = ({ name, path }) => {
  return (
    <Link
      to={path}
      className="items-center font-semibold inline-flex text-white hover:text-lime text-3xl tracking-wider"
    >
      {name}
    </Link>
  );
};

export default NavItem;
