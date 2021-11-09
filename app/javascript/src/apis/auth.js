import axios from "axios";

const login = payload => axios.post("/session", payload);
const logout = () => axios.delete("/session");
const authApi = {
  login,
  logout,
};

export default authApi;
