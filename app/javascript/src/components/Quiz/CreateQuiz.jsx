import React, { useState } from "react";

import { Toastr } from "@bigbinary/neetoui/v2";

import quizzesApi from "apis/quizzes";
import Container from "components/Common/Container";

import QuizForm from "./Form/QuizForm";

const CreateQuiz = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async title => {
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

  const handleValidation = e => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle.length === 0) Toastr.error(Error("Title can't be blank"));
    else handleSubmit(trimmedTitle);
  };

  return (
    <Container>
      <QuizForm
        setTitle={setTitle}
        handleValidation={handleValidation}
        loading={loading}
      />
    </Container>
  );
};

export default CreateQuiz;
