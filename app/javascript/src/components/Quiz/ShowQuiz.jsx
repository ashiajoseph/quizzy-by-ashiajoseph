import React, { useState, useEffect, useRef, useContext } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { isNil, isEmpty, either } from "ramda";
import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";
import Container from "components/Common/Container";
import PageHeader from "components/Common/PageHeader";

import EmptyList from "./EmptyList";
import ShowQuestionAnswers from "./Question/ShowQuestionAnswers";
import { quizContext } from "./QuizContext";

const ShowQuiz = () => {
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState({});
  const [questionList, setQuestionList] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const empty = useRef(false);
  const { setTotalQuestions, setPublish, publish } = useContext(quizContext);
  const { quizid } = useParams();

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(quizid);
      const data = response.data;
      setQuiz(data.quiz);
      setQuestionList(data.questions);
      setTotalQuestions(data.questions.length);
      setOptionList(data.options);
      const published = data.quiz.slug ? true : false;
      setPublish(published);
      empty.current = false;
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, [publish]);

  if (loading) {
    return (
      <div className="py-10 mt-4">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(questionList)) {
    empty.current = true;
  }

  return (
    <Container>
      <PageHeader
        heading={`${quiz.title} Quiz`}
        link_name="Add question"
        link_path={`/quizzes/${quizid}/questions/new`}
      />
      {empty.current && (
        <EmptyList content="There are no questions in this quiz" />
      )}
      {!empty.current && (
        <ShowQuestionAnswers
          questionList={questionList}
          setQuestionList={setQuestionList}
          optionList={optionList}
          slug={quiz.slug}
        />
      )}
    </Container>
  );
};

export default ShowQuiz;
