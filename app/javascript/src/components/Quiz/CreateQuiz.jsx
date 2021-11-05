import React, { useState } from "react";

import QuizForm from "./QuizForm";

import Container from "../Container";
//import quizzesApi from 'apis/quizzes'

export const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    logger.info(title);
  };
  return (
    <Container>
      <QuizForm setTitle={setTitle} handleSubmit={handleSubmit} />
    </Container>
  );
};
