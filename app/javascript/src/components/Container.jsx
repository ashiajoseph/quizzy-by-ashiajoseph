import React from "react";

import PropTypes from "prop-types";

import NavBar from "components/NavBar";

const Container = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="px-4 mx-auto">
        <div className="mx-auto min-h-1/2">{children}</div>
      </div>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;