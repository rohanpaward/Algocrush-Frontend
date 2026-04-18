import axios from "axios";
import { AUTH_ME } from "../../constants";

axios.defaults.withCredentials = true;

export const getMe = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(AUTH_ME, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};