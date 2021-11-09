import React, { useState } from "react";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import LoginForm from "components/Authentication/Form/LoginForm";
import { setToLocalStorage } from "helpers/storage";

import Container from "../Container";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.login({ login: { email, password } });

      setToLocalStorage({
        authToken: response.data.authentication_token,
        email,
        userId: response.data.id,
        userName: response.data.first_name + " " + response.data.last_name,
      });
      setAuthHeaders();
      setLoading(false);
      window.location.href = "/";
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
