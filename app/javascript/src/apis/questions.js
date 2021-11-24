import axios from "axios";

const create = payload => axios.post("questions", payload);
const show = (id, quiz_id) =>
  axios.get(`questions/${id}`, { params: { quiz_id } });
const update = ({ id, payload }) => axios.put(`questions/${id}`, payload);
const destroy = (id, quiz_id) =>
  axios.delete(`questions/${id}`, { params: { quiz_id } });

const questionsApi = {
  create,
  show,
  update,
  destroy,
};
export default questionsApi;
