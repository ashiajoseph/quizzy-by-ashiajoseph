import axios from "axios";

const list = () => axios.get("/quizzes");
const create = payload => axios.post("/quizzes", payload);
const show = quizid => axios.get(`/quizzes/${quizid}`);
const update = ({ quizid, payload }) => axios.put(`quizzes/${quizid}`, payload);
const destroy = quizid => axios.delete(`/quizzes/${quizid}`);
const check_slug = slug => axios.get(`/quizzes/${slug}/check_slug`);
const publish = quizid => axios.put(`/quizzes/${quizid}/publish`);
const quizzesApi = {
  list,
  create,
  show,
  update,
  destroy,
  check_slug,
  publish,
};

export default quizzesApi;
