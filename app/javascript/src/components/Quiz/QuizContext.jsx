import React, { createContext, useState } from "react";

const quizContext = createContext();

const QuizProvider = ({ children }) => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [publish, setPublish] = useState(false);
  return (
    <quizContext.Provider
      value={{ totalQuestions, setTotalQuestions, publish, setPublish }}
    >
      {children}
    </quizContext.Provider>
  );
};
export { quizContext, QuizProvider };
