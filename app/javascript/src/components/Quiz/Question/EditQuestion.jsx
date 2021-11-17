import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { Toastr } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import optionsApi from "apis/options";
import questionsApi from "apis/questions";
import Container from "components/Common/Container";

import QuestionForm from "../Form/QuestionForm";

const EditQuestion = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [qa, setQA] = useState({ question: "", answer: "" });
  const [optionList, setOptionList] = useState([]);

  const { quizid, id } = useParams();

  const passOptions = async list => {
    try {
      await optionsApi.create({ id, option: { list: list, question_id: id } });
    } catch (error) {
      logger.error(error);
    }
  };
  const passQuestions = async () => {
    try {
      await questionsApi.update({
        id,
        payload: { mcq: { question: qa.question } },
      });
      const optList = optionList.map((value, index) => {
        const answer = qa.answer == index;
        return { content: value, answer: answer };
      });
      passOptions(optList);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (qa.answer == "" || qa.answer == undefined) {
      Toastr.error(Error("Please select the Correct Answer"));
    } else {
      await passQuestions();
      await history.push(`/quiz/${quizid}`);
    }
  };

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
      setLoading(false);
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
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default EditQuestion;
