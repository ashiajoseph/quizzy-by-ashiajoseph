import React, { useState, useEffect } from "react";

import { Toastr } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";
import Container from "components/Common/Container";

import QuizForm from "./Form/QuizForm";

const EditQuiz = ({ history }) => {
  const [title, setTitle] = useState(" ");
  const { quizid } = useParams();
  const [loading, setLoading] = useState(false);

  const passQuizDetails = async title => {
    setLoading(true);
    try {
      await quizzesApi.update({
        quizid,
        payload: { quiz: { title: title, setslug: false } },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle.length === 0) Toastr.error(Error("Title can't be blank"));
    else passQuizDetails(trimmedTitle);
  };
  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(quizid);
      const { quiz } = await response.data;
      setTitle(quiz.title);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <Container>
      <QuizForm
        action="update"
        title={title}
        setTitle={setTitle}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </Container>
  );
};

export default EditQuiz;
