import axios from "axios";

const list = quizid => axios.get("/attempts", { params: { quizid } });
const update = id => axios.put(`attempts/${id}`, {});
const attemptsApi = {
  list,
  update,
};
export default attemptsApi;
