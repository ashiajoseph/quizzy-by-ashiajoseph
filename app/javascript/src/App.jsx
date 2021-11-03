import React, { useState, useEffect } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) return <h2>Loading ...</h2>;

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>} />
      </Switch>
    </Router>
  );
};

export default App;
