import React, { useState } from "react";

import LoginForm from "components/Authentication/Form/LoginForm";

import Container from "../Container";

// import authApi from "apis/auth";
// import { setAuthHeaders } from "apis/axios";
// import { setToLocalStorage } from "helpers/storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    logger.info(email, password);
    setLoading(false);
  };

  return (
    <Container>
      <LoginForm
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </Container>
  );
};

export default Login;
