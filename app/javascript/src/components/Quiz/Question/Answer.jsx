import React from "react";

import { CheckCircle } from "@bigbinary/neeto-icons";

const Answer = ({ options }) => {
  const correct = "text-green-600";
  return (
    <div className="w-93 mx-auto ">
      {options.map(({ content, answer }, index) => (
        <div key={index} className="flex flex-row  mx-1 my-3">
          <p className="font-light mr-6 whitespace-pre	text-lg">
            Option {index + 1}
          </p>
          <div className="flex flex-row">
            <p
              className={`font-medium text-lg break-all mr-2 ${
                answer ? correct : null
              }`}
            >
              {content}
            </p>
            {answer && (
              <CheckCircle size={21} className="neeto-ui-text-success mt-1" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Answer;
