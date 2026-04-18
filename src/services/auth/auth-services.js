import axios from "axios";
import { AUTH_ME } from "../../constants";

axios.defaults.withCredentials = true;

export const getMe = async () => {
  const res = await axios.get(
    `${AUTH_ME}`
  );
  return res.data;
};