import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";
import Container from "components/Common/Container";

import EmptyList from "./EmptyList";
import PageHeader from "./PageHeader";

const ShowQuiz = () => {
  const [quiz, setQuiz] = useState("");
  const { slug } = useParams();
  const fetchQuiz = async () => {
    try {
      const response = await quizzesApi.show(slug);
      const data = await response.data;
      setQuiz(data.quiz.title);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchQuiz();
  }, []);
  return (
    <Container>
      <PageHeader
        heading={`${quiz} Quiz`}
        link_name="Add questions"
        link_path={`/${slug}/question/create`}
      />
      <EmptyList content="There are no questions in this quiz" />
    </Container>
  );
};

export default ShowQuiz;
