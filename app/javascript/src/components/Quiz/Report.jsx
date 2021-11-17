import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";

import quizzesApi from "apis/quizzes";
import Container from "components/Common/Container";
import PageHeader from "components/Common/PageHeader";

const Report = () => {
  const [loading, setLoading] = useState(false);

  const fetchReportDetails = async () => {
    setLoading(true);
    try {
      const response = await quizzesApi.generate_report();
      logger.info(response.data);
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReportDetails();
  }, []);

  if (loading) {
    return (
      <div className="py-10 mt-4">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <PageHeader heading="Reports" link_name="Download" link_path="/" />
    </Container>
  );
};

export default Report;
