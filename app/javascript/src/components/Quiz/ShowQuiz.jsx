import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";

import PageHeader from "./PageHeader";

import Container from "../Container";

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
        head={`${quiz} Quiz`}
        link_name="Add questions"
        link_path=""
      />
    </Container>
  );
};

export default ShowQuiz;
