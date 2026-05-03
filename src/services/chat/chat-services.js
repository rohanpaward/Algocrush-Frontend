import api from "../../api/axiosInstance";
import { GET_CHAT_LIST  } from "../../constants";

export const getChatList = async (userId) => {
    return await api.get(GET_CHAT_LIST, {
        params: { userId }
      });
};