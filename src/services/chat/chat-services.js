import api from "../../api/axiosInstance";
import { GET_CHAT_LIST, GET_CONVO_BY_ID  } from "../../constants";

export const getChatList = async (userId) => {
    return await api.get(GET_CHAT_LIST, {
        params: { userId }
      });
};

export const getConvoById = async (data) =>{
    return await api.post(GET_CONVO_BY_ID,data)
}