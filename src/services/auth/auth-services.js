import axios from "axios";

axios.defaults.withCredentials = true;

export const getMe = async () => {
  const res = await axios.get(
    "http://localhost:3001/api/v1/algocrush/auth/me"
  );
  return res.data;
};