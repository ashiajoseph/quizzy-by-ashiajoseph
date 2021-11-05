import React, { useState, useEffect } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { isNil, isEmpty, either } from "ramda";

import quizzesApi from "apis/quizzes";

import Container from "./Container";
import AddLink from "./Quiz/AddLink";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [quizList, setQuizList] = useState([]);

  const fetchQuizList = async () => {
    try {
      const response = await quizzesApi.list();
      setQuizList(response.data.quizzes);
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
    return <div className="w-screen h-screen">Loading...</div>;
  }

  if (either(isNil, isEmpty)(quizList)) {
    return (
      <Container>
        <div className="px-10 py-8 flex flex-col">
          <div className="flex justify-end">
            <AddLink name="Add new quiz" path="/quiz/create" style="" />
          </div>
          <Typography
            lineHeight="normal"
            style="h1"
            weight="light"
            className=" text-center mt-32 py-10 text-gray-600	"
          >
            You have not created any quiz
          </Typography>
        </div>
      </Container>
    );
  }
  logger.info(quizList);
  return (
    <Container>
      <div className="px-10 py-8 flex flex-col">
        <div className="flex justify-end">
          <AddLink name="Add new quiz" path="/quiz/create" style="" />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
