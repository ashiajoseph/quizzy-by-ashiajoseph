import axios from "axios";

const list = slug => axios.get("questions", { params: { slug } });
const create = payload => axios.post("questions", payload);
const questionsApi = {
  create,
  list,
};
export default questionsApi;
