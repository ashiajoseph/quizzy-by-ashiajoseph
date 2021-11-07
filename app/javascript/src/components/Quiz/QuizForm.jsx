import React from "react";

import Button from "../Button";
import Input from "../Input";

const QuizForm = ({ title, setTitle, handleSubmit }) => {
  return (
    <div>
      <div className="flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-sm">
          <h2 className="mt-6 text-3xl font-extrabold text-center ">
            Add new quiz
          </h2>

          <form className="" onSubmit={handleSubmit}>
            <Input
              label="Quiz Title"
              type="text"
              placeholder=""
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Button type="submit" buttonText="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
