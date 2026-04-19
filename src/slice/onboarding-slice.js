// src/slice/onboarding-slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domains, getLookingFor, getRoles } from "../services/onboarding/onboarding-service";

// ✅ thunk
export const fetchRoles = createAsyncThunk(
  "onboarding/fetchRoles",
  async () => {
    const res = await getRoles();
    return res.data; // 🔥 important (your API returns { data: [] })
  }
);

export const fetchLookingFor = createAsyncThunk(
  "onboarding/fetchLookingFor",
  async () => {
    const res = await getLookingFor();
    return res.data; // 🔥 important (your API returns { data: [] })
  }
);

export const fetchDomains = createAsyncThunk("onboarding/fetchdomain",
  async () =>{
    const res = await domains()
    return res.data
  }
)

const initialState = {
  formData: {
    name: "",
    avatar: "",
    roleId: null,
    roleName: "",
    builderType: "",
    projectName: "",
    projectDesc: "",
    githubUrl: "",
    lookingfor:null,
    vibeAnswer:"",
  },
  roles: [],       // ✅ add this
  lookingForOptions:[],
  domains: [],   // ✅ add this
  loading: false,  // ✅ add this
  error: null,     // ✅ add this
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,

  // ✅ reducers (ONLY sync logic)
  reducers: {
    updateForm: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
    },
  },

  // ✅ extraReducers OUTSIDE reducers
  extraReducers: (builder) => {
    builder
      // roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  
      // lookingFor
      .addCase(fetchLookingFor.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLookingFor.fulfilled, (state, action) => {
        state.loading = false;
        state.lookingForOptions = action.payload;
      })
      .addCase(fetchLookingFor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  
      // ✅ domains
      .addCase(fetchDomains.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDomains.fulfilled, (state, action) => {
        state.loading = false;
        state.domains = action.payload;
      })
      .addCase(fetchDomains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
}

);

export const { updateForm, resetForm } = onboardingSlice.actions;
export default onboardingSlice.reducer;