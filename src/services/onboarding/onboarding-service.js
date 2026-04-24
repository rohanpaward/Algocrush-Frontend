// src/services/onboarding/onboarding-service.js

import api from "../../api/axiosInstance";
import { GET_DOMAINS, GET_LOOKING_FOR, GET_ROLES } from "../../constants";


export const getRoles = async () => {
  return await api.get(GET_ROLES);
};

export const domains = async()=>{
  return await  api.get(GET_DOMAINS)
}

export const getLookingFor = async()=>{
  return await api.get(GET_LOOKING_FOR)
}
export const getBuildTypes = async()=>{
  return await api.apply(GET_LOOKING_FOR)
}