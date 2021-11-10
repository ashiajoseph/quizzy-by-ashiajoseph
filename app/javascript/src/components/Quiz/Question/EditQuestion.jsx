import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import questionsApi from "apis/questions";
import Container from "components/Common/Container";

import QuestionForm from "../Form/QuestionForm";

const EditQuestion = () => {
  const [loading, setLoading] = useState(false);
  const [qa, setQA] = useState({ question: "", answer: "" });
  const [optionList, setOptionList] = useState([]);
  const { id } = useParams();

  const formatOptions = list => {
    const formatted_list = list.map(({ content, answer }, index) => {
      if (answer) {
        setQA(prev => {
          return { ...prev, ["answer"]: String(index) };
        });
      }

      return content;
    });
    setOptionList(formatted_list);
  };

  const fetchQuestion = async () => {
    try {
      const response = await questionsApi.show(id);
      const data = await response.data;
      setQA(prev => {
        return { ...prev, ["question"]: data.qa.question };
      });
      formatOptions(data.qa.options);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchQuestion();
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="py-10 mt-4">
          <PageLoader />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <QuestionForm
        action="update"
        optionList={optionList}
        setOptionList={setOptionList}
        qa={qa}
        setQA={setQA}
      />
    </Container>
  );
};

export default EditQuestion;
