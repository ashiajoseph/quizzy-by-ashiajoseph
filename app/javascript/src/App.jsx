import React, { useState, useEffect } from "react";

import { isEmpty, isNil } from "ramda";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Login from "components/Authentication/Login";
import { getFromLocalStorage } from "helpers/storage";

import Dashboard from "./components/Dashboard";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !(isNil(authToken) || isEmpty(authToken));
  logger.info(isLoggedIn);
  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) return <h2>Loading ...</h2>;

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/login" component={Login} />
        {!isLoggedIn ? (
          <Redirect to="/login" />
        ) : (
          <Route exact path="/" component={Dashboard} />
        )}
      </Switch>
    </Router>
  );
};

export default App;
