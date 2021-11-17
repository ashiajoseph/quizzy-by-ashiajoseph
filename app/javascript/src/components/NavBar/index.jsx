import React from "react";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import { getFromLocalStorage } from "helpers/storage";

import NavItem from "./NavItem";

const NavBar = () => {
  const userName = getFromLocalStorage("authUserName");

  const handleLogout = async () => {
    try {
      await authApi.logout();
      localStorage.clear();
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <nav className="bg-black ">
      <div className="px-2 mx-auto sm:px-4 lg:px-8">
        <div className="flex justify-between h-16 ">
          <div className="flex px-2 lg:px-0">
            <NavItem name="Quizzy" path="/" style="text-3xl tracking-wider" />
          </div>
          <div className="flex items-center">
            {userName && (
              <div className="flex flex-row justify-center ">
                <NavItem name="Reports" path={`/report`} style="text-xl" />
                <NavItem name={userName} path="/" style="text-xl" />

                <button
                  className="font-semibold inline-flex text-xl text-white pl-5 hover:text-lime focus:outline-none"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
