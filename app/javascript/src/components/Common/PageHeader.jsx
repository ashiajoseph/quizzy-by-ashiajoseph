import React from "react";

import NavItem from "../NavBar/NavItem";

const PageHeader = ({
  heading,
  link_name = "",
  link_path = "",
  hide = false,
}) => {
  return (
    <div className="pt-8 pb-4 mt-4  flex flex-col">
      <div className="flex justify-between items-center ">
        <div className="w-3/4 flex flex-col	">
          <h1 className="text-4xl text-gray-800	capitalize break-words ">
            {heading}
          </h1>
        </div>
        <div>
          {!hide && (
            <NavItem
              name={link_name}
              path={link_path}
              heading={heading}
              style="text-lg text-black rounded-md py-2 px-4 bg-lime mr-5"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
