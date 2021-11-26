import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { Toastr } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import attemptsApi from "apis/attempts";
import quizzesApi from "apis/quizzes";
import usersApi from "apis/users";
import Container from "components/Common/Container";

import DisplayAttemptQuiz from "./DisplayAttemptQuiz";
import PariticipantForm from "./Form/PariticipantForm";

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
  const [marks, setMarks] = useState({ correct: 0, incorrect: 0 });
  const [resultData, setResultData] = useState({});

  const { slug } = useParams();

  const handleSubmit = async () => {
    setBtnLoading(true);
    try {
      const response = await usersApi.create({
        user: userDetails,
        quiz_id: quizData["id"],
      });
      const data = response.data;
      setAttemptId(data.attempt_id);
      if (!data.eligible_to_take_quiz) {
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

  //Login
  const handleValidation = e => {
    e.preventDefault();
    const anyBlankFields = Object.values(userDetails).some(
      value => value.length === 0
    );
    if (anyBlankFields) {
      Toastr.error(
        Error(
          "Participant Details can't be blank. Please fill in all the details."
        )
      );
    } else handleSubmit();
  };

  //fetch -Quiz data
  const fetchQuizData = async () => {
    try {
      const response_quiz = await quizzesApi.check_slug(slug);
      const quizdata = response_quiz.data;
      setQuizData(quizdata);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchParticipantAnswers = async () => {
    try {
      const response = await attemptsApi.retrieve_attempt_answers(attemptId);
      const data = response.data;
      setMarks({ correct: data.correct, incorrect: data.incorrect });
      setResultData(data.result);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result) {
      setLoading(true);
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
          handleValidation={handleValidation}
          loading={btnLoading}
        />
      )}
      {quiz && (
        <DisplayAttemptQuiz
          result={result}
          attemptId={attemptId}
          quizData={quizData}
          setQuizData={setQuizData}
          setResult={setResult}
          marks={marks}
          resultData={resultData}
        />
      )}
    </Container>
  );
};

export default Participant;
