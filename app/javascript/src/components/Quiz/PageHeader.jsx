import React from "react";

import AddLink from "./AddLink";

const PageHeader = ({ head, link_name, link_path }) => {
  return (
    <div className="py-8 mt-4  flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl text-gray-800	capitalize ">{head}</h1>
        <AddLink name={link_name} path={link_path} style="" />
      </div>
    </div>
  );
};

export default PageHeader;
