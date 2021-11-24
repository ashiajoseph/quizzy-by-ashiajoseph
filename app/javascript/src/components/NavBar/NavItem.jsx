import React from "react";

import { Link } from "react-router-dom";

const NavItem = ({ name, path, style = "", heading = "" }) => {
  return (
    <Link
      to={{ pathname: path, state: heading }}
      className={`items-center font-semibold ${style} `}
    >
      {name}
    </Link>
  );
};

export default NavItem;
