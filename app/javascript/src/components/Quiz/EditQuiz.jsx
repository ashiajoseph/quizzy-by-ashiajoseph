import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";
import Container from "components/Common/Container";

import QuizForm from "./Form/QuizForm";

const EditQuiz = ({ history }) => {
  const [title, setTitle] = useState(" ");
  const { quizid } = useParams();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await quizzesApi.update({
        quizid,
        payload: { quiz: { title: title } },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(quizid);
      const { quiz } = await response.data;
      setTitle(quiz.title);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <Container>
      <QuizForm
        action="update"
        title={title}
        setTitle={setTitle}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </Container>
  );
};

export default EditQuiz;
