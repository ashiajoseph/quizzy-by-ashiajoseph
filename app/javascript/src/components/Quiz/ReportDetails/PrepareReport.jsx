import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";

import Container from "components/Common/Container";
import PageHeader from "components/Common/PageHeader";

const PrepareReport = () => {
  const [loading, setLoading] = useState(true);

  // const fetchReportDetails = async () => {
  //   setLoading(true);
  //   try {

  //   } catch (error) {
  //     logger.error(error);
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    //fetchReportDetails();
    setLoading(false);
  }, []);

  return (
    <Container>
      <PageHeader heading="Reports" link_name="" link_path="/" hide={true} />
      <div className="mt-40 text-center">
        {loading && (
          <div>
            <h1 className="text-3xl text-gray-700	 break-words block font-medium">
              Your Report is being prepared for Downloading
            </h1>
            <PageLoader color="lightgreen" className="mt-6" />
          </div>
        )}
      </div>
    </Container>
  );
};

export default PrepareReport;
