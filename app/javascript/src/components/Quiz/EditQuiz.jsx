import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";

import QuizForm from "./QuizForm";

import Container from "../Container";

const EditQuiz = ({ history }) => {
  const [title, setTitle] = useState(" ");
  const { slug } = useParams();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await quizzesApi.update({
        slug,
        payload: { quiz: { title: title } },
      });
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };
  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(slug);
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
      />
    </Container>
  );
};

export default EditQuiz;
