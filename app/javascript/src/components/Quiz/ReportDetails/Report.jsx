import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";

import reportsApi from "apis/reports";
import Container from "components/Common/Container";
import PageHeader from "components/Common/PageHeader";

import ReportTable from "../Table/ReportTable";

const Report = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState([]);
  const [showInfoToastr, setShowInfoToastr] = useState(false);
  const fetchReportDetails = async () => {
    try {
      const response = await reportsApi.generate_report();
      const data = response.data;
      setReportData(data.report_data);
      setShowInfoToastr(data.published_quiz_present);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
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
      <PageHeader
        heading="Reports"
        link_name="Download"
        link_path="/report/prepare"
        hide={reportData.length ? false : true}
      />
      <ReportTable reportData={reportData} showInfoToastr={showInfoToastr} />
    </Container>
  );
};

export default Report;
