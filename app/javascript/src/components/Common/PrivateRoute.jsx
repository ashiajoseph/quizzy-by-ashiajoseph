import React from "react";

import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const PrivateRoute = ({ condition, redirectRoute, children, ...props }) => {
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
