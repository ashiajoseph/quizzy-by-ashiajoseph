import axios from "axios";

const create = payload => axios.post("/users", payload);
//const generate_report = () => axios.get("/generate_report");

const usersApi = {
  create,
};
export default usersApi;
