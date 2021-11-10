import React from "react";

import Answer from "./Answer";

const ShowQA = ({ questionList, optionList }) => {
  return (
    <div className="flex flex-col w-70 mx-auto">
      {questionList.map(({ question }, index) => (
        <div
          key={index}
          className="mt-10 border-b-2 border-opacity-75	border-gray-300	"
        >
          <div className="flex flex-row mb-3 justify-between text-lg">
            <div className="flex flex-row ">
              <p className="font-light mx-4 text-lg">Question {index + 1}</p>
              <p className="font-medium text-lg break-words">{question}</p>
            </div>
            <div className="mx-4">Edit Delete</div>
          </div>
          <Answer options={optionList[index]} />
        </div>
      ))}
    </div>
  );
};

export default ShowQA;
