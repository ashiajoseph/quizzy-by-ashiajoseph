import React from "react";

import { Delete, Edit } from "@bigbinary/neeto-icons";
import { Tooltip } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Answer from "./Answer";

const ShowQA = ({ questionList, optionList }) => {
  const { slug } = useParams();
  const history = useHistory();
  const editQuestion = id => {
    history.push(`/${slug}/question/${id}/edit`);
  };
  return (
    <div className="flex flex-col w-3/4 mx-auto">
      {questionList.map(({ id, question }, index) => (
        <div
          key={index}
          className="mt-6 border-b-2 border-opacity-75	border-gray-300	pb-8"
        >
          <div className="flex justify-end mb-2">
            <Tooltip position="bottom" content="Edit">
              <button
                className="focus:outline-none ml-5 "
                onClick={() => editQuestion(id)}
              >
                <Edit size={32} />
              </button>
            </Tooltip>
            <Tooltip position="bottom" content="Delete">
              <button className="focus:outline-none ml-5 " onClick={() => {}}>
                <Delete size={28} className="neeto-ui-text-error" />
              </button>
            </Tooltip>
          </div>
          <div className="flex flex-row w-full">
            <h3 className="font-light mx-4 text-lg w-10">
              Question {index + 1}
            </h3>
            <h3 className="font-medium text-lg break-words w-4/5 mr-5">
              {question}
            </h3>
          </div>
          <Answer options={optionList[index]} />
        </div>
      ))}
    </div>
  );
};

export default ShowQA;
