import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import attemptsApi from "apis/attempts";
import quizzesApi from "apis/quizzes";
import usersApi from "apis/users";
import Container from "components/Common/Container";

import PariticipantForm from "./Form/PariticipantForm";
import QuizQA from "./Form/QAForm";

const Participant = () => {
  const [loading, setLoading] = useState(false);
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
      const data = await response.data;
      setAttemptId(data.attempt_id);
      if (!data.eligible) {
        setResult(true);
      }
      setLogin(false);
      setQuiz(true);
      setBtnLoading(false);
    } catch (error) {
      logger.error(error);
      setBtnLoading(false);
    }
  };

  const submitAnswers = async formatted_answer => {
    try {
      await attemptsApi.update(attemptId);
      await attemptsApi.create({
        attempts: { attempt_answers_attributes: formatted_answer },
        id: attemptId,
      });
      setResult(true);
    } catch (error) {
      logger.error(error);
    }
  };

  const format_answers = () => {
    return questionList
      .map(({ id }) => id)
      .reduce((array, id) => {
        let val = answers[id] ? answers[id] : "";
        return [...array, { answer: val, question_id: id }];
      }, []);
  };
  //Participant submit answers - answer stored in db
  const handleSubmit = async e => {
    e.preventDefault();
    setBtnLoading(true);
    setLoading(true);
    setQuiz(false);
    const formatted_answer = format_answers();
    await submitAnswers(formatted_answer);
    setBtnLoading(false);
  };

  //initial fetch - without answers
  const fetchQA = async () => {
    try {
      const response1 = await quizzesApi.check_slug(slug);
      const quizdata = response1.data;
      const response2 = await attemptsApi.list(quizdata.id);
      const data = await response2.data;
      setQuizData(quizdata);
      setQuestionList(data.questions);
      setOptionList(data.options);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchQA();
  }, []);

  // fetch - with correct option
  const fetchParticipantAnswers = async () => {
    try {
      const response = await attemptsApi.retrieve_attempt_answers(attemptId);
      const data = await response.data;
      setMarks({ correct: data.correct, incorrect: data.incorrect });
      setResultData(data.result);
      setQuiz(true);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
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
        <QuizQA
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
