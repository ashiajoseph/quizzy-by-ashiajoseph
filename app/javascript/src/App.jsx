import React, { useState, useEffect } from "react";

import { isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import Dashboard from "components/Dashboard";
import Participant from "components/Public/Participant";
import PublicBase from "components/Public/PublicBase";
import CreateQuiz from "components/Quiz/CreateQuiz";
import EditQuiz from "components/Quiz/EditQuiz";
import CreateQuestion from "components/Quiz/Question/CreateQuestion";
import EditQuestion from "components/Quiz/Question/EditQuestion";
import { QuizProvider } from "components/Quiz/QuizContext";
import PrepareReport from "components/Quiz/ReportDetails/PrepareReport";
import Report from "components/Quiz/ReportDetails/Report";
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

          <Route
            exact
            path="/public/:slug/attempt/new"
            component={Participant}
          />
          <Route path="/public/:slug" component={PublicBase} />
          <PrivateRoute redirectRoute="/login" condition={isLoggedIn}>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/quiz/new" component={CreateQuiz} />
              <Route exact path="/quiz/:quizid/edit" component={EditQuiz} />
              <Route exact path="/quiz/:quizid" component={ShowQuiz} />
              <Route
                exact
                path="/:quizid/questions/new"
                component={CreateQuestion}
              />
              <Route
                exact
                path="/:quizid/questions/:id/edit"
                component={EditQuestion}
              />
              <Route exact path="/report" component={Report} />
              <Route exact path="/report/prepare" component={PrepareReport} />
            </Switch>
          </PrivateRoute>
        </Switch>
      </Router>
    </QuizProvider>
  );
};

export default App;
