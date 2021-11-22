import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { Toastr } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import questionsApi from "apis/questions";
import Container from "components/Common/Container";

import QuestionForm from "../Form/QuestionForm";

const EditQuestion = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [qa, setQA] = useState({ question: "", answer: "" });
  const [optionList, setOptionList] = useState([]);
  const [fetchedOptionList, setFetchedOptionList] = useState({});
  const { quizid, id } = useParams();

  const formatReturnedOptions = () => {
    const list = fetchedOptionList.map(({ id }, index) => {
      const newcontent = optionList[index];
      const answer = qa.answer == index;
      if (newcontent !== undefined) {
        return { id: id, content: newcontent.trim(), answer: answer };
      }

      return { id: id, content: "", answer: false, _destroy: "1" };
    });
    let newOptions = [];
    if (fetchedOptionList.length < optionList.length) {
      let start = fetchedOptionList.length;
      newOptions = optionList.splice(start).map((value, index) => {
        const answer = qa.answer == index + start;
        return { content: value.trim(), answer: answer };
      });
    }

    return [...list, ...newOptions];
  };

  const passQuestions = async formattedOptions => {
    try {
      await questionsApi.update({
        id,
        payload: {
          mcq: {
            question: qa.question.trim(),
            quiz_id: quizid,
            options_attributes: formattedOptions,
          },
        },
      });
      setBtnLoading(false);
    } catch (error) {
      logger.error(error);
      setBtnLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const isBlankQuestion = qa.question.trim().length === 0;
    const isBlankOptions = optionList.some(
      option => option.trim().length === 0
    );
    if (qa.answer == "" || qa.answer == undefined) {
      Toastr.error(Error("Please select the Correct Answer"));
    } else if (isBlankQuestion) {
      Toastr.error(Error("Question can't be blank"));
    } else if (isBlankOptions) {
      Toastr.error(Error("Option can't be blank"));
    } else {
      setBtnLoading(true);
      const formattedOptions = formatReturnedOptions();
      await passQuestions(formattedOptions);
      history.push(`/quiz/${quizid}`);
    }
  };

  const formatFetchedOptions = list => {
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
      setFetchedOptionList(data.qa.options);
      formatFetchedOptions(data.qa.options);
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
        loading={btnLoading}
      />
    </Container>
  );
};

export default EditQuestion;
