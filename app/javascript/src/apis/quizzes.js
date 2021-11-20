import axios from "axios";

const list = () => axios.get("/quizzes");
const create = payload => axios.post("/quizzes", payload);
const show = quizid => axios.get(`quizzes/${quizid}`);
const update = ({ quizid, payload }) => axios.put(`quizzes/${quizid}`, payload);
const destroy = quizid => axios.delete(`quizzes/${quizid}`);
const check_slug = slug => axios.get(`public/quiz/${slug}`);
const exportreport = () => axios.get("/export");
const export_status = () => axios.get("/export_status");
const export_download = () => axios.get("/export_download");
const quizzesApi = {
  list,
  create,
  show,
  update,
  destroy,
  check_slug,
  exportreport,
  export_status,
  export_download,
};

export default quizzesApi;
