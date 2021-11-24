import axios from "axios";

const create = payload => axios.post("questions", payload);
const show = id => axios.get(`questions/${id}`);
const update = ({ id, payload }) => axios.put(`questions/${id}`, payload);
const destroy = id => axios.delete(`questions/${id}`);
const questionsApi = {
  create,
  show,
  update,
  destroy,
};
export default questionsApi;
