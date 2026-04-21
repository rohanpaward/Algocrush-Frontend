// src/slice/onboarding-slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domains, getBuildTypes, getLookingFor, getRoles } from "../services/onboarding/onboarding-service";

// ✅ thunk
export const fetchRoles = createAsyncThunk(
  "onboarding/fetchRoles",
  async () => {
    const res = await getRoles();
    return res.data; 
  }
);

export const fetchLookingFor = createAsyncThunk(
  "onboarding/fetchLookingFor",
  async () => {
    const res = await getLookingFor();
    return res.data; 
  }
);

export const fetchDomains = createAsyncThunk("onboarding/fetchdomain",
  async () =>{
    const res = await domains()
    return res.data
  }
)

export const fetchBuildTypes = createAsyncThunk(
  "onboarding/fetchBuildTypes",
  async () => {
    const res = await getBuildTypes();
    return res.data; // 🔥 important (your API returns { data: [] })
  }
);


const initialState = {
  formData: {
    name: "",
    CollegeName:"",
    studyYear:"",
    collabStatus:"",
    avatar: "",
    roleId: null,
    roleName: "",
    buildTypeIds: [],
    projectGithubUrl:"",
    ProjectLiveUrl:"",
    projectName: "",
    projectProblem:"",
    projectChallenge: "",
    projectSolution:"",
    currentBuild:"",
    githubUrl: "",
    lookingfor:null,
    vibeAnswer:"",
  },
  roles: [],       
  lookingForOptions:[],
  domains: [],   
  loading: false,  
  error: null,     
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
  
      // ✅ build types
      .addCase(fetchBuildTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBuildTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.buildtypesoption = action.payload;
      })
      .addCase(fetchBuildTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
}

);

export const { updateForm, resetForm } = onboardingSlice.actions;
export default onboardingSlice.reducer;