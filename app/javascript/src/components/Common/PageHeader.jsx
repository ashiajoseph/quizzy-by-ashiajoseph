import React, { useContext } from "react";

import { Paragraph } from "@bigbinary/neeto-icons";

import AddLink from "./AddLink";

import { quizContext } from "../Quiz/QuizContext";

const PageHeader = ({ heading, link_name, link_path }) => {
  const { totalQuestions } = useContext(quizContext);
  return (
    <div className="py-8 mt-4  flex flex-col">
      <div className="flex justify-between items-center ">
        <h1 className="text-4xl text-gray-800	capitalize break-words w-70	">
          {heading}
        </h1>
        <div>
          <AddLink name={link_name} path={link_path} heading={heading} />
          {totalQuestions != 0 && (
            <button
              className={` font-semibold text-lg text-black rounded-md py-2 px-4 bg-lime  `}
            >
              <Paragraph className="inline" size={20} /> Publish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
