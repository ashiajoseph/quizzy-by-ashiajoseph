import React from "react";

import { useLocation } from "react-router-dom";

import Container from "../../Container";
import QuestionForm from "../Form/QuestionForm";

const CreateQuestion = () => {
  const location = useLocation();
  const heading = location.state;
  return (
    <Container>
      <QuestionForm heading={heading} />
    </Container>
  );
};

export default CreateQuestion;
