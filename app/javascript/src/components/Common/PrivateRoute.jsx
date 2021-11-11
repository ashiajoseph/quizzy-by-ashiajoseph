import React from "react";

import Logger from "js-logger";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const PrivateRoute = ({ condition, redirectRoute, children, ...props }) => {
  Logger.info(children);
  if (!condition) {
    return (
      <Redirect
        to={{
          pathname: redirectRoute,
          from: props.location,
        }}
      />
    );
  }

  return <div>{children}</div>;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  condition: PropTypes.bool,
  path: PropTypes.string,
  redirectRoute: PropTypes.string,
  location: PropTypes.object,
};

export default PrivateRoute;
