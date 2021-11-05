import axios from "axios";

const list = () => axios.get("/quizzes");
//const create = (payload) => axios.post("/quizzes")

const quizzesApi = {
  list,
  //  create
};

export default quizzesApi;
