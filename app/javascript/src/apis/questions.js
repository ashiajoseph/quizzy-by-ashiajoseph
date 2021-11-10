import axios from "axios";

const list = slug => axios.get("questions", { params: { slug } });
const create = payload => axios.post("questions", payload);
const show = id => axios.get(`questions/${id}`);

const questionsApi = {
  create,
  list,
  show,
};
export default questionsApi;
