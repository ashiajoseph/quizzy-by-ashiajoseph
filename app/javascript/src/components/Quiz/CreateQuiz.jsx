import React, { useState } from "react";

import quizzesApi from "apis/quizzes";
import Container from "components/Common/Container";

import QuizForm from "./Form/QuizForm";

const CreateQuiz = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await quizzesApi.create({ quiz: { title } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  return (
    <Container>
      <QuizForm
        setTitle={setTitle}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </Container>
  );
};

export default CreateQuiz;
