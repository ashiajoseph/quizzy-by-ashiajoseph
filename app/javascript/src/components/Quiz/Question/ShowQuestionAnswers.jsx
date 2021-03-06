import React, { useState } from "react";

import {
  Delete,
  Edit,
  Checkmark,
  Copy,
  Paragraph,
  Loading,
} from "@bigbinary/neeto-icons";
import { Tooltip, Toastr } from "@bigbinary/neetoui/v2";
import { useParams, useHistory, Link } from "react-router-dom";

import questionsApi from "apis/questions";
import quizzesApi from "apis/quizzes";

import Answer from "./Answer";

const ShowQuestionAnswers = ({
  questionList,
  setQuestionList,
  optionList,
  setPublish,
  publish,
  quiz,
  setQuiz,
}) => {
  const [loading, setLoading] = useState(false);
  const { quizid } = useParams();
  const history = useHistory();
  const editQuestion = id => {
    history.push(`/quizzes/${quizid}/questions/${id}/edit`);
  };

  const deleteQuestion = async Id => {
    try {
      await questionsApi.destroy(Id, quizid);
      setQuestionList(prevlist => prevlist.filter(({ id }) => id !== Id));
    } catch (error) {
      logger.error(error);
    }
  };

  const publishQuiz = async () => {
    setLoading(true);
    try {
      const response = await quizzesApi.publish(quizid);
      const { slug } = response.data;
      setQuiz(prev => {
        return { ...prev, slug: slug };
      });
      setPublish(true);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyPublicLink = () => {
    const link = `${window.location.origin}/public/${quiz.slug}`;
    navigator.clipboard.writeText(link);
    Toastr.success("Link copied to clipboard");
  };
  return (
    <>
      {!publish && (
        <div className="mb-6">
          <button
            onClick={publishQuiz}
            className={` w-1/6 font-semibold text-lg text-black rounded-md py-2 px-4 bg-lime focus:outline-none `}
          >
            {loading ? (
              <Loading />
            ) : (
              <>
                <Paragraph className="inline" size={20} /> Publish
              </>
            )}
          </button>
        </div>
      )}
      {publish && (
        <div className="mt-3 text-lg text-gray-600 flex items-center">
          <Checkmark className="neeto-ui-text-black mr-1" size={20} />
          Published, your public link -
          <Link to={`/public/${quiz.slug}`} className="text-blue-600 mr-2">
            {`${window.location.origin}/public/${quiz.slug}`}
          </Link>
          <Tooltip position="right-end" content="Copy URL">
            <button className="focus:outline-none">
              <Copy
                className="neeto-ui-text-gray-500 cursor-pointer"
                onClick={copyPublicLink}
                size={22}
              />
            </button>
          </Tooltip>
        </div>
      )}
      <div className="flex flex-col w-3/4 mx-auto bg-gray-200 my-6 pl-6 pr-8">
        {questionList.map(({ id, question }, index) => (
          <div
            key={index}
            className="mt-6 border-b-2 border-opacity-75	border-gray-600	pb-4"
          >
            <div className="flex justify-end mb-2 mr-3">
              <Tooltip position="bottom" content="Edit">
                <button
                  className="focus:outline-none ml-5 mr-4"
                  onClick={() => editQuestion(id)}
                >
                  <Edit size={32} />
                </button>
              </Tooltip>
              <Tooltip position="bottom" content="Delete">
                <button
                  className="focus:outline-none ml-5 "
                  onClick={() => deleteQuestion(id)}
                >
                  <Delete size={28} className="neeto-ui-text-error" />
                </button>
              </Tooltip>
            </div>
            <div className="flex flex-row w-full">
              <h3 className="font-light  text-lg w-14">Question {index + 1}</h3>
              <h3 className="font-medium text-lg break-words w-5/6 ml-4">
                {question}
              </h3>
            </div>
            <Answer options={optionList[index]} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowQuestionAnswers;
