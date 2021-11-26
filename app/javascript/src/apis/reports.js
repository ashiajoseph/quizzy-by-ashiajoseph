import axios from "axios";

const generate_report = () => axios.get("/reports/generate_report");
const export_report = () => axios.get("/reports/export");
const export_status = id => axios.get(`/reports/${id}/export_status`);
const export_download = jobId =>
  axios.get(`/reports/${jobId}/export_download`, { responseType: "blob" });

const reportsApi = {
  export_report,
  export_status,
  generate_report,
  export_download,
};

export default reportsApi;
