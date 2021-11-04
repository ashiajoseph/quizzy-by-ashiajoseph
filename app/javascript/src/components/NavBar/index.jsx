import React from "react";

import NavItem from "./NavItem";

const NavBar = () => {
  return (
    <nav className="bg-black ">
      <div className="px-2 mx-auto sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="flex">
              <NavItem name="Quizzy" path="/" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
