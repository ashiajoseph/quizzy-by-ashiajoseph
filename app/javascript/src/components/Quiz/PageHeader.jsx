import React from "react";

import AddLink from "./AddLink";

const PageHeader = ({ heading, link_name, link_path }) => {
  return (
    <div className="py-8 mt-4  flex flex-col">
      <div className="flex justify-between items-center ">
        <h1 className="text-4xl text-gray-800	capitalize break-words w-70	">
          {heading}
        </h1>
        <AddLink name={link_name} path={link_path} heading={heading} />
      </div>
    </div>
  );
};

export default PageHeader;
