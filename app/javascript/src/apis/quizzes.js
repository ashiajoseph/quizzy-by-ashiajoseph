import axios from "axios";

const list = () => axios.get("/quizzes");
const quizzesApi = {
  list,
};

export default quizzesApi;
