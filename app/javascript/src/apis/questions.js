import axios from "axios";

const list = slug => axios.get("questions", { params: { slug } });
const create = payload => axios.post("questions", payload);
const show = id => axios.get(`questions/${id}`);
const update = ({ id, payload }) => axios.put(`questions/${id}`, payload);
const questionsApi = {
  create,
  list,
  show,
  update,
};
export default questionsApi;
