import React, { useState } from "react";

//import Button from "../../Button";
import { Plus, Minus } from "@bigbinary/neeto-icons";
import { Tooltip } from "@bigbinary/neetoui/v2";

import Input from "../../Input";

const QuestionForm = ({ action = "create", handleSubmit, heading }) => {
  const [optionList, setOptionList] = useState([{ value: "" }, { value: "" }]);

  const handleChange = e => {
    const { name, value } = e.target;
    logger.info(name, value);
  };
  const addOption = () => {
    if (optionList.length < 4) {
      setOptionList(optList => [...optList, { value: "" }]);
    }
  };
  const removeOption = index => {
    setOptionList(optList => optList.filter((item, ind) => ind !== index + 2));
  };
  let hide = optionList.length == 4 ? "hidden" : null;
  return (
    <>
      <div className="flex flex-col items-center justify-center my-10 ">
        <div>
          <h1 className="text-4xl text-gray-800 capitalize break-words mx-auto">
            {heading}
          </h1>
          <h2 className="mt-5 text-xl font-bold text-center text-gray-600">
            {action == "create" ? "Add question" : "Edit question"}
          </h2>
        </div>
        <div className="w-10/12	">
          <form onSubmit={handleSubmit}>
            <div className="w-3/4 mx-auto">
              <Input
                from="create/edit"
                label="Question"
                type="text"
                placeholder=""
                name="question"
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-around">
              <div className="w-2/5 py-5">
                <Input
                  label="Option 1"
                  type="text"
                  name="option"
                  placeholder=""
                  onChange={handleChange}
                />
                <Input
                  label="Option 2"
                  type="text"
                  name="option"
                  placeholder=""
                  onChange={handleChange}
                />
              </div>
              <div className="w-2/5 py-5">
                {optionList.slice(2).map(({ value }, index) => (
                  <div key={index} className="relative">
                    <Input
                      label={`Option ${index + 3}`}
                      type="text"
                      name="option"
                      placeholder=""
                      value={value}
                      onChange={handleChange}
                    />
                    <Tooltip position="right-end" content="Remove">
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="absolute -bottom-1 right-0 bg-red-500 m-1 rounded-full focus:outline-none "
                      >
                        <Minus className="neeto-ui-text-white" />
                      </button>
                    </Tooltip>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addOption}
                  className={`text-lg text-lime block mt-8 font-extrabold focus:outline-none hover:underline ${hide}`}
                >
                  {" "}
                  <Plus className="inline" /> Add Option
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default QuestionForm;
