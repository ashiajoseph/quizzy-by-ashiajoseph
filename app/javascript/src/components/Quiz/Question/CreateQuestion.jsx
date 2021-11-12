import React, { useState } from "react";

import { Toastr } from "@bigbinary/neetoui/v2";
import { useParams, useLocation } from "react-router-dom";

import questionsApi from "apis/questions";
import Container from "components/Common/Container";

import QuestionForm from "../Form/QuestionForm";

const CreateQuestion = ({ history }) => {
  const [qa, setQA] = useState({ question: "", answer: "" });
  const [optionList, setOptionList] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const heading = location.state;
  const { quizid } = useParams();

  const passQuestions = async () => {
    try {
      const optList = optionList.map((value, index) => {
        const answer = qa.answer == index;
        return { content: value, answer: answer };
      });
      await questionsApi.create({
        mcq: {
          question: qa.question,
          quiz_id: quizid,
          options_attributes: optList,
        },
      });

      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (qa.answer == "" || qa.answer == undefined) {
      Toastr.error(Error("Please select the Correct Answer"));
    } else {
      setLoading(true);
      await passQuestions();
      history.push(`/quiz/${quizid}`);
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
        loading={loading}
      />
    </Container>
  );
};

export default CreateQuestion;
