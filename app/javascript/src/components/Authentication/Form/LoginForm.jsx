import React from "react";

import Button from "components/Button";
import Input from "components/Input";

const LoginForm = ({ handleSubmit, setEmail, setPassword, loading }) => {
  return (
    <div className="flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-sm">
        <h2
          className="mt-6 text-3xl font-extrabold
          text-center "
        >
          Login
        </h2>

        <form className="" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="oliver@example.com"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="********"
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" buttonText="Submit" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
