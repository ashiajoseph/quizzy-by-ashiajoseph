import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";

import attemptsApi from "apis/attempts";
import questionsApi from "apis/questions";

import QuizAttemptForm from "./Form/QuizAttemptForm";

const DisplayAttemptQuiz = ({
  result,
  attemptId,
  quizData,
  setResult,
  marks,
  resultData,
}) => {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [answers, setAnswers] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await attemptsApi.create({
        attempt_answers_attributes: answers,
        id: attemptId,
      });
      setResult(true);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  // initial fetch - without answers
  const fetchQuestionsWithoutCorrectOptions = async () => {
    try {
      const response_question_options = await questionsApi.list(quizData.id);
      const data = response_question_options.data;
      setQuestionList(data.questions);
      setOptionList(data.options);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionsWithoutCorrectOptions();
  }, []);

  // fetch - with correct option

  if (loading) {
    return (
      <div className="py-10 mt-4">
        <PageLoader />
      </div>
    );
  }

  return (
    <QuizAttemptForm
      result={result}
      heading={quizData.title}
      questionList={questionList}
      optionList={optionList}
      handleSubmit={handleSubmit}
      setAnswers={setAnswers}
      marks={marks}
      resultData={resultData}
    />
  );
};

export default DisplayAttemptQuiz;
