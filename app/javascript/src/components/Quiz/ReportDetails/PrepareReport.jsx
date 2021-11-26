import React, { useState, useEffect, useRef } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";

import reportsApi from "apis/reports";
import Container from "components/Common/Container";
import PageHeader from "components/Common/PageHeader";

const PrepareReport = () => {
  const [loading, setLoading] = useState(true);
  const [jobId, setJobId] = useState("");
  const interval = useRef(0);

  const downloadReport = () => {
    window.location.href = `/reports/${jobId}/export_download`;
  };
  const fetchReportDetails = async () => {
    try {
      const response_export = await reportsApi.export_report();
      const jid = response_export.data.jid;
      interval.current = setInterval(async () => {
        const response_status = await reportsApi.export_status(jid);
        const data = response_status.data;
        if (data.status === "complete") {
          clearInterval(interval.current);
          setJobId(jid);
          setLoading(false);
        }
      }, 1000);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchReportDetails();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <Container>
      <PageHeader heading="Reports" hide={true} />
      <div className="mt-40 text-center">
        {loading && (
          <div>
            <h1 className="text-3xl text-gray-700	 break-words block font-medium">
              Your Report is being prepared for Downloading
            </h1>
            <PageLoader color="lightgreen" className="mt-6" />
          </div>
        )}

        {!loading && (
          <div>
            <h1 className="text-3xl text-gray-700	 break-words block font-medium mb-10">
              Report is now ready for Download
            </h1>
            <button
              type="button"
              className={
                "font-semibold text-lg text-black rounded-md py-2 px-4 bg-lime focus:outline-none  w-1/3 hover:bg-black hover:text-lime  mx-auto"
              }
              onClick={downloadReport}
            >
              Download
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default PrepareReport;
