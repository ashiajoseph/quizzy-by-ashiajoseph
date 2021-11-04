import React, { useEffect } from "react";

import { Toastr } from "@bigbinary/neetoui/v2";

import Button from "./Button";
import Container from "./Container";

const Dashboard = () => {
  useEffect(() => {
    Toastr.success("Logged In Successfully");
  }, []);
  return (
    <Container>
      <div className="px-10 py-8 flex flex-col">
        <div className="flex justify-end">
          <Button
            buttonText="Add new quiz"
            style=" text-lg text-black rounded-md"
          />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
