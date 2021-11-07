import axios from "axios";

const list = () => axios.get("/quizzes");
const create = payload => axios.post("/quizzes", payload);
const show = slug => axios.get(`quizzes/${slug}`);
const quizzesApi = {
  list,
  create,
  show,
};

export default quizzesApi;
