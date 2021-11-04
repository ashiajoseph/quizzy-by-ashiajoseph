import React, { useState } from "react";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import LoginForm from "components/Authentication/Form/LoginForm";

import Container from "../Container";

// import { setToLocalStorage } from "helpers/storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await authApi.login({ login: { email, password } });
      logger.info(response.data);
      setAuthHeaders();
      setLoading(false);
      //window.location.href = "/";
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
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
