import axios from "axios";

const list = () => axios.get("/quizzes");
const create = payload => axios.post("/quizzes", payload);
const show = quizid => axios.get(`quizzes/${quizid}`);
const update = ({ quizid, payload }) => axios.put(`quizzes/${quizid}`, payload);
const destroy = quizid => axios.delete(`quizzes/${quizid}`);
const quizzesApi = {
  list,
  create,
  show,
  update,
  destroy,
};

export default quizzesApi;
