import axios from "axios";

const list = quiz_id => axios.get("/questions", { params: { quiz_id } });
const create = payload => axios.post("/questions", payload);
const show = (id, quiz_id) =>
  axios.get(`/questions/${id}`, { params: { quiz_id } });
const update = ({ id, payload }) => axios.put(`/questions/${id}`, payload);
const destroy = (id, quiz_id) =>
  axios.delete(`/questions/${id}`, { params: { quiz_id } });

const questionsApi = {
  list,
  create,
  show,
  update,
  destroy,
};
export default questionsApi;
