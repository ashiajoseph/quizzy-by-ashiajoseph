import axios from "axios";

const create = payload =>
  axios.post("attempts/create_attempt_answers", payload);
const retrieve_attempt_answers = id =>
  axios.get("attempts/retrieve_attempt_answers", { params: { id } });
const attemptsApi = {
  create,
  retrieve_attempt_answers,
};
export default attemptsApi;
