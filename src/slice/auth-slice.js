// src/slice/auth-slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMe } from "../services/auth/auth-services";

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async () => {
    const res = await getMe();
    return res.user || res.data; 
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // 🔥 ADD THIS: Allows EditProfile to update user fields locally
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    resetUser: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.user = null;
      });
  },
});

export const { setUser, resetUser, updateUser } = authSlice.actions; // Export updateUser
export default authSlice.reducer;