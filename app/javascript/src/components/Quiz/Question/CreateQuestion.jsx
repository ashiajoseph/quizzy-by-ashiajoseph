import React, { useState, useRef } from "react";

import { useParams, useLocation } from "react-router-dom";

import optionsApi from "apis/options";
import questionsApi from "apis/questions";
import Container from "components/Common/Container";

import QuestionForm from "../Form/QuestionForm";

const CreateQuestion = ({ history }) => {
  const [qa, setQA] = useState({ question: "", answer: "" });
  const [optionList, setOptionList] = useState(["", ""]);
  const location = useLocation();
  const heading = location.state;
  const { slug } = useParams();
  const questionId = useRef();

  const passOptions = async list => {
    try {
      await optionsApi.create({
        option: { list: list, question_id: questionId.current },
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
      const optList = optionList.map((value, index) => {
        const answer = qa.answer == index;
        return { content: value, answer: answer };
      });
      passOptions(optList);
    } catch (error) {
      logger.error(error);
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (qa.answer == "" || qa.answer == undefined) {
      logger.error("Please select the correct answer in the Form");
    } else {
      await passQuestions();
      history.push(`/quiz/${slug}`);
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
        qa={qa}
      />
    </Container>
  );
};

export default CreateQuestion;
