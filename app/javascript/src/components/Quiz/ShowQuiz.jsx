import React, { useState, useEffect, useRef, useContext } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { isNil, isEmpty, either } from "ramda";
import { useParams } from "react-router-dom";

import optionsApi from "apis/options";
import questionsApi from "apis/questions";
import quizzesApi from "apis/quizzes";
import Container from "components/Common/Container";
import PageHeader from "components/Common/PageHeader";

import EmptyList from "./EmptyList";
import ShowQA from "./Question/ShowQA";
import { quizContext } from "./QuizContext";

const ShowQuiz = () => {
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const empty = useRef(false);
  const { setotalQuestions } = useContext(quizContext);

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
    try {
      const response = await optionsApi.list(questionIdList);
      const data = await response.data;
      setOptionList(data.options);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await questionsApi.list(slug);
      const data = await response.data;
      await setQuestionList(data.questions);
      const questionIdList = data.questions.map(question => question.id);
      setotalQuestions(questionIdList.length);
      if (questionIdList.length) await fetchOptions(questionIdList);

      await setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(async () => {
    await fetchQuiz();
    await fetchQuestions();
  }, []);

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
        heading={`${quiz} Quiz`}
        link_name="Add questions"
        link_path={`/${slug}/question/create`}
      />
      {empty.current && (
        <EmptyList content="There are no questions in this quiz" />
      )}
      {!empty.current && (
        <ShowQA
          questionList={questionList}
          setQuestionList={setQuestionList}
          optionList={optionList}
        />
      )}
    </Container>
  );
};

export default ShowQuiz;
