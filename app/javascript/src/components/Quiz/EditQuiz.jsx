import React, { useState, useEffect } from "react";

import { Toastr } from "@bigbinary/neetoui/v2";
import { PageLoader } from "@bigbinary/neetoui/v2";
import { isEmpty } from "ramda";
import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";
import Container from "components/Common/Container";

import QuizForm from "./Form/QuizForm";

const EditQuiz = ({ history }) => {
  const [title, setTitle] = useState("");
  const { quizid } = useParams();
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const passQuizDetails = async title => {
    setBtnLoading(true);
    try {
      await quizzesApi.update({
        quizid,
        payload: { quiz: { title: title } },
      });
      setBtnLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setBtnLoading(false);
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
      const { quiz } = response.data;
      setTitle(quiz.title);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  if (loading) {
    return (
      <div className="py-10 mt-4">
        <PageLoader />
      </div>
    );
  }
  const valid_quiz = !isEmpty(title);

  return (
    <Container>
      {valid_quiz && (
        <QuizForm
          action="update"
          title={title}
          setTitle={setTitle}
          handleSubmit={handleSubmit}
          loading={btnLoading}
        />
      )}
    </Container>
  );
};

export default EditQuiz;
