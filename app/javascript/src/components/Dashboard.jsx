import React, { useState, useEffect, useRef } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { isNil, isEmpty, either } from "ramda";

import quizzesApi from "apis/quizzes";

import Container from "./Container";
import EmptyList from "./Quiz/EmptyList";
import PageHeader from "./Quiz/PageHeader";
import Table from "./Quiz/Table";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [quizList, setQuizList] = useState([]);
  const empty = useRef(false);
  const fetchQuizList = async () => {
    try {
      const response = await quizzesApi.list();
      const data = await response.data;
      setQuizList(data.quizzes);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  return (
    <Container>
      <PageHeader
        head={empty.current ? " " : "List of Quizzes"}
        link_name="Add new quiz"
        link_path="/quiz/create"
      />
      {empty.current && <EmptyList content="You have not created any quiz" />}
      {!empty.current && (
        <Table quizList={quizList} setQuizList={setQuizList} />
      )}
    </Container>
  );
};

export default Dashboard;
