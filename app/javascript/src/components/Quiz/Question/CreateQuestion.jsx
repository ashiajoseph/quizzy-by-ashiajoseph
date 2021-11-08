import React, { useState } from "react";

import Logger from "js-logger";
import { useLocation } from "react-router-dom";

import Container from "../../Container";
import QuestionForm from "../Form/QuestionForm";

const CreateQuestion = () => {
  const [qa, setQA] = useState({ question: "", answer: "" });
  const [optionList, setOptionList] = useState({ option1: "", option2: "" });
  const location = useLocation();
  const heading = location.state;

  const handleSubmit = e => {
    e.preventDefault();
    Logger.info(qa);
    Logger.info(optionList);
  };
  return (
    <Container>
      <QuestionForm
        heading={heading}
        handleSubmit={handleSubmit}
        optionList={optionList}
        setOptionList={setOptionList}
        setQA={setQA}
      />
    </Container>
  );
};

export default CreateQuestion;
