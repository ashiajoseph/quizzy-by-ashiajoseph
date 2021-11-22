import React, { useState } from "react";

import { Loading } from "@bigbinary/neeto-icons";
import { useLocation } from "react-router-dom";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import { getFromLocalStorage } from "helpers/storage";

import NavItem from "./NavItem";

const NavBar = () => {
  const [loading, setLoading] = useState(false);
  const userName = getFromLocalStorage("authUserName");
  const location = useLocation();
  const publicLink = location.pathname.includes("public");
  const displayNavRightDiv = userName && !publicLink;
  const handleLogout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
      localStorage.clear();
      resetAuthTokens();
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
      setLoading(false);
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
            {displayNavRightDiv && (
              <div className="flex flex-row justify-center ">
                <NavItem name="Reports" path={`/report`} style="text-xl" />
                <NavItem name={userName} path="/" style="text-xl" />

                <button
                  className="font-semibold inline-flex text-xl text-white pl-5 hover:text-lime focus:outline-none"
                  onClick={handleLogout}
                >
                  {loading ? <Loading /> : "Logout"}
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
