import React from "react";

import { Radio } from "@bigbinary/neetoui/v2";

import Button from "components/Common/Button";

const QuizQA = ({
  heading,
  questionList,
  optionList,
  handleSubmit,
  loading,
  setAnswers,
  result,
  marks,
  resultData,
}) => {
  const handleChange = ({ name, value }) => {
    setAnswers(prev => {
      return { ...prev, [name]: value };
    });
  };

  const disable = result ? true : false;
  const style = result
    ? "border-gray-400 "
    : "hover:border-blue-600 hover:bg-blue-600 hover:bg-opacity-50";

  return (
    <div className="flex items-center justify-center my-5">
      <div className="w-9/12 mb-5">
        <h2 className="mt-6 text-4xl font-bold text-center capitalize ">
          {heading} Quiz
        </h2>
        {result && (
          <div>
            <h2 className="mt-5 text-2xl font-semibold font-mono text-center text-gray-700">
              Thankyou for taking the quiz.{" "}
            </h2>
            <h2 className="mt-2 text-xl font-semibold font-mono text-center text-gray-600">
              Your Result <br />
              Total no. of Correct Answers : {`${marks.correct}`} <br />
              Total no. of Incorrect Answers : {`${marks.incorrect}`}
            </h2>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {questionList.map(({ id, question }, index) => {
            const question_id = id;
            return (
              <div
                key={index}
                className="bg-gray-200 bg-opacity-50 px-10 pt-8 py-4 mt-6 w-full"
              >
                <div className="flex flex-row w-full">
                  <h3 className="font-light  text-lg w-14">
                    Question {index + 1}
                  </h3>
                  <h3 className="font-medium text-lg break-words w-5/6 ml-4">
                    {question}
                  </h3>
                </div>
                <div className="pl-6 pr-2 border-3 w-full mt-4 ">
                  {
                    <Radio name={`${id}`} stacked>
                      {optionList[index].map(({ id, content }, ind) => {
                        let optted =
                          result &&
                          resultData[question_id] &&
                          resultData[question_id]["answer"] == id
                            ? true
                            : false;
                        let crtstyle =
                          result &&
                          resultData[question_id] &&
                          resultData[question_id]["option_id"] == id
                            ? "border-green-300 bg-opacity-75 bg-green-300"
                            : "";
                        return (
                          <Radio.Item
                            key={ind}
                            name={question_id}
                            label={content}
                            value={id}
                            className={`w-full break-all text-black px-2 py-3 border-2 ${style} ${crtstyle}`}
                            onChange={e => handleChange(e.target, id)}
                            disabled={disable}
                            checked={result ? optted : null}
                          />
                        );
                      })}
                    </Radio>
                  }
                </div>
              </div>
            );
          })}
          {!result && (
            <div className="w-5/12 mx-auto">
              <Button type="submit" buttonText="Submit" loading={loading} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default QuizQA;
