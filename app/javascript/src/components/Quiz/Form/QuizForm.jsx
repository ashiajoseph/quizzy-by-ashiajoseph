import React from "react";

import Button from "components/Common/Button";
import Input from "components/Common/Input";

const QuizForm = ({
  action = "create",
  title,
  setTitle,
  handleSubmit,
  loading,
}) => {
  return (
    <>
      <div className="flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-sm">
          <h2 className="mt-6 text-3xl font-extrabold text-center ">
            {action == "create" ? "Add new quiz" : "Edit quiz"}
          </h2>

          <form onSubmit={handleSubmit}>
            <Input
              from="create/edit"
              label="Quiz Title"
              type="text"
              placeholder=""
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Button
              type="submit"
              buttonText={action == "create" ? "Submit" : "Update"}
              loading={loading}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default QuizForm;
