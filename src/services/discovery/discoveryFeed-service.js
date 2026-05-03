import api from "../../api/axiosInstance";
import { GET_USER_FEED, RECORD_SWIPE } from "../../constants";


export const getUserFeed = async (userId) => {
    return await api.get(GET_USER_FEED, {
        params: { userId }
      });
};

export const recordSwipe = async(data)=> {
    return await api.post(RECORD_SWIPE, data);
}