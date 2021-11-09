import React, { useState, useRef } from "react";

import Logger from "js-logger";
import { useParams, useLocation } from "react-router-dom";

import optionsApi from "apis/options";
import questionsApi from "apis/questions";

import Container from "../../Container";
import QuestionForm from "../Form/QuestionForm";

const CreateQuestion = () => {
  const [qa, setQA] = useState({ question: "", answer: "" });
  const [optionList, setOptionList] = useState({ option1: "", option2: "" });
  const location = useLocation();
  const heading = location.state;
  const { slug } = useParams();
  const questionId = useRef();

  const passOptions = async (content, answer) => {
    try {
      await optionsApi.create({
        option: {
          content: content,
          question_id: questionId.current,
          answer: answer,
        },
      });
    } catch (error) {
      logger.error(error);
    }
  };

  const passQuestions = async () => {
    try {
      const response = await questionsApi.create({
        mcq: { question: qa.question, slug: slug },
      });
      const data = await response.data;
      questionId.current = data.question_id;
      Object.keys(optionList).map(option => {
        const answer = qa.answer == option;
        passOptions(optionList[option], answer);
      });
    } catch (error) {
      logger.error(error);
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (qa.answer == "" || qa.answer == undefined) {
      Logger.error("Please select the correct answer in the Form");
    } else {
      await passQuestions();
    }
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
