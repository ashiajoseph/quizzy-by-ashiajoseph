import axios from "axios";

const login = payload => axios.post("/session", payload);

const authApi = {
  login,
};

export default authApi;
