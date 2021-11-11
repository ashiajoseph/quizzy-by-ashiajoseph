import axios from "axios";

const list = idList => axios.get("/options", { params: { idList } });
const create = payload => axios.post("/options", payload);

const optionsApi = {
  create,
  list,
};
export default optionsApi;
