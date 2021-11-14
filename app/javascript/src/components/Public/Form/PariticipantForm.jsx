import React from "react";

import Button from "components/Common/Button";
import Input from "components/Common/Input";

const PariticipantForm = ({
  handleSubmit,
  loading,
  setEmail,
  setFirstName,
  setLastName,
}) => {
  return (
    <div className="flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-sm">
        <h2
          className="mt-6 text-3xl font-extrabold
              text-center "
        >
          Welcome to Quiz
        </h2>

        <form onSubmit={handleSubmit}>
          <Input
            label="First Name"
            placeholder="Eve"
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            label="Last Name"
            placeholder="Smith"
            onChange={e => setLastName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            placeholder="evesmith@example.com"
            onChange={e => setEmail(e.target.value)}
          />
          <Button type="submit" buttonText="Submit" loading={loading} />
        </form>
      </div>
    </div>
  );
};
export default PariticipantForm;
