import React, { createContext, useState } from "react";

const quizContext = createContext();

const QuizProvider = ({ children }) => {
  const [totalQuestions, setotalQuestions] = useState(0);
  const [publish, setPublish] = useState(false);
  return (
    <quizContext.Provider
      value={{ totalQuestions, setotalQuestions, publish, setPublish }}
    >
      {children}
    </quizContext.Provider>
  );
};
export { quizContext, QuizProvider };
