import React, { useState, useContext } from "react";

import { Paragraph } from "@bigbinary/neeto-icons";
import { Loading } from "@bigbinary/neeto-icons";
import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";

import AddLink from "./AddLink";

import { quizContext } from "../Quiz/QuizContext";

const PageHeader = ({
  heading,
  link_name = "",
  link_path = "",
  hide = false,
}) => {
  const [loading, setLoading] = useState(false);
  const { totalQuestions, publish, setPublish } = useContext(quizContext);
  const { quizid } = useParams();

  const publishQuiz = async () => {
    setLoading(true);
    try {
      await quizzesApi.update({
        quizid,
        payload: { quiz: { title: heading, setslug: true } },
      });
      setPublish(true);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
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
          {!hide && (
            <AddLink name={link_name} path={link_path} heading={heading} />
          )}
          {totalQuestions != 0 && !publish && (
            <button
              onClick={publishQuiz}
              className={` font-semibold text-lg text-black rounded-md py-2 px-4 bg-lime focus:outline-none `}
            >
              {loading ? (
                <Loading />
              ) : (
                <>
                  <Paragraph className="inline" size={20} /> Publish
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
