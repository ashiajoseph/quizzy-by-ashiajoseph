import axios from "axios";

const export_report = () => axios.get("/export");
const export_status = id => axios.get(`/export_status/${id}`);
const export_download = id => axios.get(`/export_download/${id}`);
const reportsApi = {
  export_report,
  export_status,
  export_download,
};

export default reportsApi;
