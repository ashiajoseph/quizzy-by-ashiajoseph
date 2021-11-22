import React from "react";

import Lost from "images/lost.png";

import Container from "components/Common/Container";

import PageHeader from "./Common/PageHeader";

const ErrorBoundary = () => {
  return (
    <Container>
      <PageHeader
        heading="You have landed some where unknown"
        link_name="Go to Dashboard"
        link_path="/"
      />
      <div className="w-1/2 mx-auto my-24 px-10">
        <img src={Lost} className="mx-auto w-7/12" />
      </div>
    </Container>
  );
};

export default ErrorBoundary;
