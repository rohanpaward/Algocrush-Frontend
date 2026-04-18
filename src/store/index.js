// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import onboardingReducer from "../slice/onboarding-slice";

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
  },
});