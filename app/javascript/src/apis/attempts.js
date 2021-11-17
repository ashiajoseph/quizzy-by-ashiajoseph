import axios from "axios";

const list = quizid => axios.get("/attempts", { params: { quizid } });
const update = id => axios.put(`attempts/${id}`, {});
const create = payload =>
  axios.post("attempts/create_attempt_answers", payload);
const retrieve_attempt_answers = id =>
  axios.get("attempts/retrieve_attempt_answers", { params: { id } });
const attemptsApi = {
  list,
  update,
  create,
  retrieve_attempt_answers,
};
export default attemptsApi;
