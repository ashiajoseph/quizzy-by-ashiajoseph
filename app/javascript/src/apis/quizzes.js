import axios from "axios";

const list = () => axios.get("/quizzes");
const create = payload => axios.post("/quizzes", payload);
const show = quizid => axios.get(`quizzes/${quizid}`);
const update = ({ quizid, payload }) => axios.put(`quizzes/${quizid}`, payload);
const destroy = quizid => axios.delete(`quizzes/${quizid}`);
const check_slug = slug => axios.get(`public/quiz/${slug}`);
const retrieve_title = id => axios.get(`/quizzes/${id}/retrieve_title`);
const publish = ({ quizid, payload }) =>
  axios.put(`/quizzes/${quizid}/publish`, payload);
const quizzesApi = {
  list,
  create,
  show,
  update,
  destroy,
  check_slug,
  retrieve_title,
  publish,
};

export default quizzesApi;
