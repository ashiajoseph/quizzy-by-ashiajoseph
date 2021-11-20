import axios from "axios";

const export_report = () => axios.get("/export");
const export_status = id => axios.get(`/export_status/${id}`);
const generate_report = () => axios.get("/generate_report");
const export_download = id => axios.get(`/export_download/${id}`);
const reportsApi = {
  export_report,
  export_status,
  generate_report,
  export_download,
};

export default reportsApi;
