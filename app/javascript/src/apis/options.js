import axios from "axios";

const create = payload => axios.post("/options", payload);

const optionsApi = {
  create,
};
export default optionsApi;
