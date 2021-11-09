import axios from "axios";

const create = payload => axios.post("questions", payload);
const questionsApi = {
  create,
};
export default questionsApi;
