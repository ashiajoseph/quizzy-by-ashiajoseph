import React, { useEffect } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { initializeLogger } from "./common/logger";

const App = () => {
  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
  }, []);
  logger.error("---");
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>} />
      </Switch>
    </Router>
  );
};

export default App;
