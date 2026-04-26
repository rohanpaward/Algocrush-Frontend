// src/services/onboarding/onboarding-service.js

import api from "../../api/axiosInstance";
import { UPDATE_USER } from "../../constants";


export const updateUserService = async (data) => {
    return await api.put(UPDATE_USER, data);
  };
