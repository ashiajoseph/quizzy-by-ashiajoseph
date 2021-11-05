import React, { useState } from "react";

import quizzesApi from "apis/quizzes";

import QuizForm from "./QuizForm";

import Container from "../Container";

export const CreateQuiz = ({ history }) => {
  const [title, setTitle] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    //logger.info(title);

    try {
      await quizzesApi.create({ quiz: { title } });
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <Container>
      <QuizForm setTitle={setTitle} handleSubmit={handleSubmit} />
    </Container>
  );
};
