import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminData: null,
  loading: false,
  error: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    fetchAdminDataStart: (state) => {
      state.loading = true;
    },
    fetchAdminDataSuccess: (state, action) => {
      // console.log("===>",action.payload);
      
      state.adminData = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchAdminDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAdminData: (state) => {
      state.adminData = null;
    },
  },
});

export const {
  fetchAdminDataStart,
  fetchAdminDataSuccess,
  fetchAdminDataFailure,
  clearAdminData,
} = adminSlice.actions;

export default adminSlice.reducer;
