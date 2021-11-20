import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";

import reportsApi from "apis/reports";
import Container from "components/Common/Container";
import PageHeader from "components/Common/PageHeader";

const PrepareReport = () => {
  const [loading, setLoading] = useState(true);
  const [jobId, setJobId] = useState("");

  const downloadReport = () => {
    window.location.href = `/export_download/${jobId}`;
  };
  const fetchReportDetails = async () => {
    try {
      const response1 = await reportsApi.export_report();
      const jid = await response1.data.jid;
      const interval = setInterval(async () => {
        const response2 = await reportsApi.export_status(jid);
        const data = response2.data;
        if (data.status === "complete") {
          clearInterval(interval);
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

        {!loading && (
          <div>
            <h1 className="text-3xl text-gray-700	 break-words block font-medium mb-10">
              Report is now ready for Download
            </h1>
            <button
              type="button"
              className={`flex justify-center  px-4 py-2 bg-lime
              font-medium leading-5 transition duration-150
              ease-in-out border border-transparent
              group focus:outline-none w-1/3 hover:bg-black hover:text-lime text-md rounded-lg mx-auto`}
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
