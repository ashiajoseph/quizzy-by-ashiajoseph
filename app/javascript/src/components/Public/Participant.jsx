import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import attemptsApi from "apis/attempts";
import quizzesApi from "apis/quizzes";
import usersApi from "apis/users";
import Container from "components/Common/Container";

import PariticipantForm from "./Form/PariticipantForm";
import QuizAttemptForm from "./Form/QuizAttemptForm";

const Participant = () => {
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [login, setLogin] = useState(true);
  const [quiz, setQuiz] = useState(false);
  const [result, setResult] = useState(false);
  const [attemptId, setAttemptId] = useState(0);
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [quizData, setQuizData] = useState({});

  const [questionList, setQuestionList] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [answers, setAnswers] = useState({});
  const [marks, setMarks] = useState({ correct: 0, incorrect: 0 });
  const [resultData, setResultData] = useState({});
  const { slug } = useParams();

  //Login
  const handleNext = async e => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const response = await usersApi.create({
        user: userDetails,
        quiz_id: quizData["id"],
      });
      const data = response.data;
      setAttemptId(data.attempt_id);
      if (!data.eligible) {
        setResult(true);
      }
      setLogin(false);
      setQuiz(true);
    } catch (error) {
      logger.error(error);
    } finally {
      setBtnLoading(false);
    }
  };

  const submitAnswers = async () => {
    try {
      await attemptsApi.update(attemptId);
      await attemptsApi.create({
        attempt_answers_attributes: answers,
        id: attemptId,
      });
      setResult(true);
    } catch (error) {
      logger.error(error);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setBtnLoading(true);
    setLoading(true);
    setQuiz(false);
    await submitAnswers();
  };

  //initial fetch - without answers
  const fetchQA = async () => {
    try {
      const response1 = await quizzesApi.check_slug(slug);
      const quizdata = response1.data;
      const response2 = await attemptsApi.list(quizdata.id);
      const data = response2.data;
      setQuizData(quizdata);
      setQuestionList(data.questions);
      setOptionList(data.options);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQA();
  }, []);

  // fetch - with correct option
  const fetchParticipantAnswers = async () => {
    try {
      const response = await attemptsApi.retrieve_attempt_answers(attemptId);
      const data = response.data;
      setMarks({ correct: data.correct, incorrect: data.incorrect });
      setResultData(data.result);
      setQuiz(true);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result) {
      fetchParticipantAnswers();
    }
  }, [result]);

  if (loading) {
    return (
      <div className="py-10 mt-4">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      {login && (
        <PariticipantForm
          heading={quizData.title}
          setUserDetails={setUserDetails}
          handleSubmit={handleNext}
          loading={btnLoading}
        />
      )}
      {quiz && (
        <QuizAttemptForm
          result={result}
          heading={quizData.title}
          questionList={questionList}
          optionList={optionList}
          handleSubmit={handleSubmit}
          setAnswers={setAnswers}
          marks={marks}
          resultData={resultData}
          loading={btnLoading}
        />
      )}
    </Container>
  );
};

export default Participant;
