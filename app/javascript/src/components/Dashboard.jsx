import React, { useEffect } from "react";

import { Toastr } from "@bigbinary/neetoui/v2";

import Container from "./Container";

const Dashboard = () => {
  useEffect(() => {
    Toastr.success("Logged In Successfully");
  }, []);
  return <Container>No QUIZ</Container>;
};

export default Dashboard;
