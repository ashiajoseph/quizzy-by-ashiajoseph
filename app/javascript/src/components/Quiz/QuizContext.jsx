import React, { createContext, useState } from "react";

const quizContext = createContext();

const QuizProvider = ({ children }) => {
  const [totalQuestions, setotalQuestions] = useState(0);

  return (
    <quizContext.Provider value={{ totalQuestions, setotalQuestions }}>
      {children}
    </quizContext.Provider>
  );
};
export { quizContext, QuizProvider };
