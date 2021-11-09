import React, { useState } from "react";

import quizzesApi from "apis/quizzes";
import Container from "components/Common/Container";

import QuizForm from "./Form/QuizForm";

const CreateQuiz = ({ history }) => {
  const [title, setTitle] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
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

export default CreateQuiz;
