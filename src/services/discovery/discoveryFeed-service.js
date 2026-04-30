import api from "../../api/axiosInstance";
import { GET_USER_FEED } from "../../constants";


export const getUserFeed = async (userId) => {
    return await api.get(GET_USER_FEED, {
        params: { userId }
      });
};