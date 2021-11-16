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
  const [login, setLogin] = useState(true);
  const [quiz, setQuiz] = useState(false);
  const [result, setResult] = useState(false);
  const [attemptId, setAttemptId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [quizData, setQuizData] = useState({});
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [marks, setMarks] = useState({ correct: 0, incorrect: 0 });
  const { slug } = useParams();

  const handleNext = async e => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const response = await usersApi.create({
        user: { first_name: firstName, last_name: lastName, email: email },
        quiz_id: quizData["id"],
      });
      const data = await response.data;
      setAttemptId(data.attempt_id);
      if (data.eligible) {
        setLogin(false);
        setQuiz(true);
      }
      setBtnLoading(false);
    } catch (error) {
      logger.error(error);
      setBtnLoading(false);
    }
  };

  const submitAnswers = async () => {
    try {
      //console.log(attemptId)
      await attemptsApi.update(attemptId);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setBtnLoading(true);
    await submitAnswers();

    const answerlist = Object.keys(answers).filter(
      question_no => optionList[question_no][answers[question_no]]["answer"]
    );
    setMarks({
      correct: answerlist.length,
      incorrect: questionList.length - answerlist.length,
    });
    setResult(true);
    logger.info(answers);
    setBtnLoading(false);

    // window.scrollTo(0, 0);
  };
  logger.info(attemptId);
  const fetchQA = async () => {
    try {
      const response1 = await quizzesApi.check_slug(slug);
      const quizdata = response1.data;
      const response2 = await attemptsApi.list(quizdata.id);
      const data = await response2.data;
      logger.info(data);
      setQuizData(quizdata);
      logger.info(quizdata);
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
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
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
          loading={btnLoading}
        />
      )}
    </Container>
  );
};

export default Participant;
