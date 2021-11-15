import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import questionsApi from "apis/questions";
import quizzesApi from "apis/quizzes";
import Container from "components/Common/Container";

import PariticipantForm from "./Form/PariticipantForm";
import QuizQA from "./Form/QAForm";

const Participant = () => {
  const [login, setLogin] = useState(false);
  const [quiz, setQuiz] = useState(true);
  const [result, setResult] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [answers, setAnswers] = useState({});
  const [marks, setMarks] = useState({ correct: 0, incorrect: 0 });
  const { slug } = useParams();

  const handleNext = async e => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      logger.info(firstName, lastName, email);
      setLogin(false);
      setQuiz(true);
      setBtnLoading(false);
    } catch (error) {
      logger.error(error);
      setBtnLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setBtnLoading(true);
    const answerlist = Object.keys(answers).filter(
      question_no => optionList[question_no][answers[question_no]]["answer"]
    );
    setMarks({
      correct: answerlist.length,
      incorrect: questionList.length - answerlist.length,
    });
    setResult(true);
    setBtnLoading(false);

    window.scrollTo(0, 0);
  };

  const fetchQA = async () => {
    try {
      const response1 = await quizzesApi.check_slug(slug);
      const quizdata = response1.data;
      const response2 = await questionsApi.list(quizdata.id);
      const data = await response2.data;
      setHeading(quizdata.title);
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
          heading={heading}
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
          heading={heading}
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
