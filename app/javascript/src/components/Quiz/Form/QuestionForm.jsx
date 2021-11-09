import React from "react";

import { Plus, Minus } from "@bigbinary/neeto-icons";
import { Tooltip } from "@bigbinary/neetoui/v2";

import Button from "../../Button";
import Input from "../../Input";

const QuestionForm = ({
  action = "create",
  handleSubmit,
  heading,
  setQA,
  optionList,
  setOptionList,
}) => {
  const handleChange = e => {
    const { name, value } = e.target;
    if (name.includes("option")) {
      setOptionList(prev => {
        return { ...prev, [`${name}`]: value };
      });
    } else {
      setQA(prev => {
        return { ...prev, [name]: value };
      });
    }
  };
  const addOption = () => {
    const len = Object.keys(optionList).length;
    if (len < 4) {
      setOptionList(optList => {
        return { ...optList, [`option${len + 1}`]: "" };
      });
    }
  };
  const removeOption = () => {
    const res = Object.keys(optionList)
      .slice(0, -1)
      .reduce((res, opt) => {
        const value = optionList[opt];
        return { ...res, [`${opt}`]: value };
      }, {});
    setOptionList(res);
  };

  let hide = Object.keys(optionList).length == 4 ? "hidden" : null;
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
        <div className="w-10/12	my-4">
          <form onSubmit={handleSubmit}>
            <div className="w-70 mx-auto">
              <Input
                from="create/edit"
                label="Question"
                type="text"
                placeholder=""
                name="question"
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-around w-3/4 mx-auto">
              <div className="w-2/5 py-5 ">
                <Input
                  label="Option 1"
                  type="text"
                  name="option1"
                  placeholder=""
                  onChange={handleChange}
                />
                <Input
                  label="Option 2"
                  type="text"
                  name="option2"
                  placeholder=""
                  onChange={handleChange}
                />
              </div>
              <div className="w-2/5 py-5">
                {Object.keys(optionList)
                  .slice(2)
                  .map((name, index) => (
                    <div key={index} className="relative">
                      <Input
                        label={`Option ${index + 3}`}
                        type="text"
                        name={name}
                        placeholder=""
                        onChange={handleChange}
                      />
                      <Tooltip position="right-end" content="Remove">
                        <button
                          type="button"
                          onClick={() => removeOption()}
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
                  className={`text-lg text-lime block mt-10 font-extrabold focus:outline-none hover:underline ${hide}`}
                >
                  <Plus className="inline" /> Add Option
                </button>
              </div>
            </div>
            <div className="w-1/2 mx-auto py-4">
              <label
                className="block text-md font-medium
                leading-5 text-gray-800"
              >
                Correct Answer
              </label>
              <select
                name="answer"
                className=" block w-full  px-3 py-2 transition duration-150 ease-in-out border border-gray-300 rounded-md bg-gray-800 text-white focus:outline-none focus:shadow-outline-black"
                onChange={handleChange}
              >
                <option value=""> Please select an option </option>
                {Object.keys(optionList).map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/3 mx-auto mt-4">
              <Button
                type="submit"
                buttonText={action == "create" ? "Submit" : "Update"}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default QuestionForm;
