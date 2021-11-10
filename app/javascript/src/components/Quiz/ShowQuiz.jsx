import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import questionsApi from "apis/questions";
import quizzesApi from "apis/quizzes";
import Container from "components/Common/Container";
import PageHeader from "components/Common/PageHeader";

import EmptyList from "./EmptyList";

const ShowQuiz = () => {
  const [quiz, setQuiz] = useState("");
  const [questionList, setQuestionList] = useState([]);

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

  const fetchOptions = async questionIdList => {
    logger.info(questionIdList);
  };

  const fetchQuestions = async () => {
    try {
      const response = await questionsApi.list(slug);
      const data = await response.data;
      await setQuestionList(data.questions);
      const questionIdList = data.questions.map(question => question.id);
      await fetchOptions(questionIdList);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(async () => {
    await fetchQuiz();
    await fetchQuestions();
  }, []);

  logger.info(questionList);

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
