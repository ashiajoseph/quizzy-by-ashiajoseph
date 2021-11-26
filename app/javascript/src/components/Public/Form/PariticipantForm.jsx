import React from "react";

import Button from "components/Common/Button";
import Input from "components/Common/Input";

const PariticipantForm = ({
  heading,
  handleValidation,
  loading,
  setUserDetails,
}) => {
  const handleChange = e => {
    const { name, value } = e.target;
    setUserDetails(prev => {
      return { ...prev, [name]: value.trim() };
    });
  };

  return (
    <div className="flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-sm">
        <h2
          className="mt-6 text-3xl font-extrabold
              text-center capitalize "
        >
          Welcome to {heading} Quiz
        </h2>

        <form onSubmit={handleValidation}>
          <Input
            label="First Name"
            placeholder="Eve"
            name="first_name"
            onChange={handleChange}
          />
          <Input
            label="Last Name"
            placeholder="Smith"
            name="last_name"
            onChange={handleChange}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="evesmith@example.com"
            onChange={handleChange}
          />
          <Button type="submit" buttonText="Next" loading={loading} />
        </form>
      </div>
    </div>
  );
};
export default PariticipantForm;
