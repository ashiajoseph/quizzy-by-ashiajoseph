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
import Dashboard from "components/Dashboard";
import CreateQuiz from "components/Quiz/CreateQuiz";
import EditQuiz from "components/Quiz/EditQuiz";
import CreateQuestion from "components/Quiz/Question/CreateQuestion";
import EditQuestion from "components/Quiz/Question/EditQuestion";
import { QuizProvider } from "components/Quiz/QuizContext";
import ShowQuiz from "components/Quiz/ShowQuiz";
import { getFromLocalStorage } from "helpers/storage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !(isNil(authToken) || isEmpty(authToken));
  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) return <h2>Loading ...</h2>;

  return (
    <QuizProvider>
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/quiz/create" component={CreateQuiz} />
          <Route exact path="/quiz/:slug/edit" component={EditQuiz} />
          <Route exact path="/quiz/:slug" component={ShowQuiz} />
          <Route
            exact
            path="/:slug/question/create"
            component={CreateQuestion}
          />
          <Route
            exact
            path="/:slug/question/:id/edit"
            component={EditQuestion}
          />
          {!isLoggedIn ? (
            <Redirect to="/login" />
          ) : (
            <Route exact path="/" component={Dashboard} />
          )}
        </Switch>
      </Router>
    </QuizProvider>
  );
};

export default App;
