import React, { useContext } from "react";

import { Paragraph, Checkmark } from "@bigbinary/neeto-icons";

import AddLink from "./AddLink";

import { quizContext } from "../Quiz/QuizContext";

const PageHeader = ({ heading, link_name, link_path }) => {
  const { totalQuestions, publish, setPublish } = useContext(quizContext);

  const publishQuiz = () => {
    setPublish(true);
  };

  return (
    <div className="pt-8 pb-4 mt-4  flex flex-col">
      <div className="flex justify-between items-center ">
        <div className="w-3/4 flex flex-col	">
          <h1 className="text-4xl text-gray-800	capitalize break-words ">
            {heading}
          </h1>
        </div>
        <div>
          <AddLink name={link_name} path={link_path} heading={heading} />
          {(totalQuestions != 0 || publish) && (
            <button
              onClick={publishQuiz}
              className={` font-semibold text-lg text-black rounded-md py-2 px-4 bg-lime focus:outline-none `}
            >
              <Paragraph className="inline" size={20} /> Publish
            </button>
          )}
        </div>
      </div>
      {publish && (
        <div className="mt-3 text-lg text-gray-600 flex items-center">
          <Checkmark className="neeto-ui-text-black mr-1" size={20} />{" "}
          Published, your public link is
        </div>
      )}
    </div>
  );
};

export default PageHeader;
