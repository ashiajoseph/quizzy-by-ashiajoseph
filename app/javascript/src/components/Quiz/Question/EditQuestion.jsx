import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { Toastr } from "@bigbinary/neetoui/v2";
import { isEmpty } from "ramda";
import { useParams } from "react-router-dom";

import questionsApi from "apis/questions";
import Container from "components/Common/Container";

import QuestionForm from "../Form/QuestionForm";

const EditQuestion = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [questionAnswer, setQuestionAnswer] = useState({
    question: "",
    answer: "",
  });
  const [optionList, setOptionList] = useState([]);
  const [fetchedOptionList, setFetchedOptionList] = useState({});
  const { quizid, id } = useParams();

  const formatReturnedOptions = () => {
    const list = fetchedOptionList.map(({ id }, index) => {
      const newcontent = optionList[index];
      const answer = questionAnswer.answer == index;
      if (newcontent !== undefined) {
        return { id: id, content: newcontent.trim(), answer: answer };
      }

      return { id: id, content: "", answer: false, _destroy: "1" };
    });
    let newOptions = [];
    if (fetchedOptionList.length < optionList.length) {
      let start = fetchedOptionList.length;
      newOptions = optionList.splice(start).map((value, index) => {
        const answer = questionAnswer.answer == index + start;
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
            question: questionAnswer.question.trim(),
            quiz_id: quizid,
            options_attributes: formattedOptions,
          },
        },
      });
      setBtnLoading(false);
      history.push(`/quiz/${quizid}`);
    } catch (error) {
      logger.error(error);
      setBtnLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const isBlankQuestion = questionAnswer.question.trim().length === 0;
    const isBlankOptions = optionList.some(
      option => option.trim().length === 0
    );
    if (questionAnswer.answer == "" || questionAnswer.answer == undefined) {
      Toastr.error(Error("Please select the Correct Answer"));
    } else if (isBlankQuestion) {
      Toastr.error(Error("Question can't be blank"));
    } else if (isBlankOptions) {
      Toastr.error(Error("Option can't be blank"));
    } else {
      setBtnLoading(true);
      const formattedOptions = formatReturnedOptions();
      await passQuestions(formattedOptions);
    }
  };

  const formatFetchedOptions = list => {
    const formatted_list = list.map(({ content, answer }, index) => {
      if (answer) {
        setQuestionAnswer(prev => {
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
      const data = response.data;
      setQuestionAnswer(prev => {
        return { ...prev, ["question"]: data.question_answer.question };
      });
      setFetchedOptionList(data.question_answer.options);
      formatFetchedOptions(data.question_answer.options);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
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
  const valid_question = !isEmpty(questionAnswer.question);
  return (
    <Container>
      {valid_question && (
        <QuestionForm
          action="update"
          optionList={optionList}
          setOptionList={setOptionList}
          questionAnswer={questionAnswer}
          setQuestionAnswer={setQuestionAnswer}
          handleSubmit={handleSubmit}
          loading={btnLoading}
        />
      )}
    </Container>
  );
};

export default EditQuestion;
