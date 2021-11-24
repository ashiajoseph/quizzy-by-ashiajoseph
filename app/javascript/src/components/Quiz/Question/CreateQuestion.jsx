import React, { useState, useEffect } from "react";

import { Toastr } from "@bigbinary/neetoui/v2";
import { PageLoader } from "@bigbinary/neetoui/v2";
import { isEmpty } from "ramda";
import { useParams } from "react-router-dom";

import questionsApi from "apis/questions";
import quizzesApi from "apis/quizzes";
import Container from "components/Common/Container";

import QuestionForm from "../Form/QuestionForm";

const CreateQuestion = ({ history }) => {
  const [questionAnswer, setQuestionAnswer] = useState({
    question: "",
    answer: "",
  });
  const [optionList, setOptionList] = useState(["", ""]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [heading, setHeading] = useState("");
  const { quizid } = useParams();

  const passQuestions = async () => {
    try {
      const optList = optionList.map((value, index) => {
        const answer = questionAnswer.answer == index;
        const optionContent = value.trim();
        return { content: optionContent, answer: answer };
      });
      const question = questionAnswer.question.trim();
      await questionsApi.create({
        mcq: {
          question: question,
          quiz_id: quizid,
          options_attributes: optList,
        },
      });
      setBtnLoading(false);
      history.push(`/quiz/${quizid}`);
    } catch (error) {
      logger.error(error);
      setBtnLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const isBlankQuestion = questionAnswer.question.trim().length === 0;
    const isBlankOptions = optionList.some(
      option => option.trim().length === 0
    );
    if (questionAnswer.answer == "" || questionAnswer.answer == undefined) {
      Toastr.error(Error("Please select the Correct Answer"));
    } else if (isBlankQuestion) {
      Toastr.error(Error("Question can't be blank"));
    } else if (isBlankOptions) {
      Toastr.error(Error("Option can't be blank"));
    } else {
      setBtnLoading(true);
      await passQuestions();
    }
  };

  const fetchTitle = async () => {
    try {
      const response = await quizzesApi.retrieve_title(quizid);
      const { title } = response.data;
      setHeading(title);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTitle();
  }, []);

  if (loading) {
    return (
      <div className="py-10 mt-4">
        <PageLoader />
      </div>
    );
  }

  const valid_quiz = !isEmpty(heading);
  return (
    <Container>
      {valid_quiz && (
        <QuestionForm
          heading={`${heading} Quiz`}
          handleSubmit={handleSubmit}
          optionList={optionList}
          setOptionList={setOptionList}
          setQuestionAnswer={setQuestionAnswer}
          questionAnswer={questionAnswer}
          loading={btnLoading}
        />
      )}
    </Container>
  );
};

export default CreateQuestion;
