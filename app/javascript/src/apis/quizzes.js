import axios from "axios";

const list = () => axios.get("/quizzes");
const create = payload => axios.post("/quizzes", payload);
const show = slug => axios.get(`quizzes/${slug}`);
const update = ({ slug, payload }) => axios.put(`quizzes/${slug}`, payload);
const destroy = slug => axios.delete(`quizzes/${slug}`);
const quizzesApi = {
  list,
  create,
  show,
  update,
  destroy,
};

export default quizzesApi;
