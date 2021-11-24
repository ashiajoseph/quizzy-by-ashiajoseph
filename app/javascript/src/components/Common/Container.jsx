import React from "react";

import PropTypes from "prop-types";

import NavBar from "components/NavBar";

const Container = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="px-8 mx-auto">
        <div className="mx-20">{children}</div>
      </div>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
