// src/api/axiosInstance.js
import axios from "axios";
import { BASEAPI } from "../constants";

const api = axios.create({
  baseURL: BASEAPI,
  withCredentials: true, // IMPORTANT for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor (global error handling)
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // handle logout / redirect
      console.error("Unauthorized - maybe token expired");
    }
    return Promise.reject(error);
  }
);

export default api;