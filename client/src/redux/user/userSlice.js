import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSucess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserState: (state) => {
      state.loading = true;
    },
    updateUserSucces: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserState:(state,action)=>{
      state.loading = true
    },
    deleteUserSucces:(state,action)=>{
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    deleteUserFailure:(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    }
    
  },
});

export const {
  signInStart,
  signInSucess,
  signInFailure,
  updateUserState,
  updateUserFailure,
  updateUserSucces,
  deleteUserState,
  deleteUserFailure,
  deleteUserSucces
} = userSlice.actions;

export default userSlice.reducer;
