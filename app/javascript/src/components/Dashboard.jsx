import React, { useState, useEffect, useRef, useContext } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { isNil, isEmpty, either } from "ramda";

import quizzesApi from "apis/quizzes";
import Container from "components/Common/Container";

import PageHeader from "./Common/PageHeader";
import EmptyList from "./Quiz/EmptyList";
import { quizContext } from "./Quiz/QuizContext";
import QuizTable from "./Quiz/Table/QuizTable";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [quizList, setQuizList] = useState([]);
  const { setTotalQuestions } = useContext(quizContext);
  const empty = useRef(false);
  const fetchQuizList = async () => {
    try {
      const response = await quizzesApi.list();
      const data = response.data;
      setQuizList(data.quizzes);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTotalQuestions(0);
    fetchQuizList();
  }, []);

  if (loading) {
    return (
      <div className="py-10 mt-4">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(quizList)) {
    empty.current = true;
  }

  const heading = empty.current ? " " : "List of Quizzes";
  return (
    <Container>
      <PageHeader
        heading={heading}
        link_name="Add new quiz"
        link_path="/quiz/new"
      />
      {empty.current && <EmptyList content="You have not created any quiz" />}
      {!empty.current && (
        <QuizTable
          quizList={quizList}
          setQuizList={setQuizList}
          empty={empty}
        />
      )}
    </Container>
  );
};

export default Dashboard;
