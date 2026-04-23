// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import onboardingReducer from "../slice/onboarding-slice";
import authReducer from "../slice/auth-slice"

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    auth:authReducer,
  },
});