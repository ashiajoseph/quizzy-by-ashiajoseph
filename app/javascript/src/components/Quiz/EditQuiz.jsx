import React, { useState, useEffect } from "react";

//import QuizForm from './QuizForm'
import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";

import Container from "../Container";

const EditQuiz = () => {
  const [title, setTitle] = useState(" ");
  const { slug } = useParams();

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(slug);
      const { quiz } = response.data;
      setTitle(quiz.title);
    } catch (errors) {
      logger.error(errors);
    }
  };
  useEffect(() => {
    fetchQuizDetails();
  }, []);

  logger.info(title);
  return <Container>edit</Container>;
};

export default EditQuiz;
