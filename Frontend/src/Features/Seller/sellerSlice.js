import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  owner: null,
  token: null,
  loading: false,
  error: null,
  success: null,
};

const ownerSlice = createSlice({
  name: "Owner_Authorization",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.owner = action.payload.owner;
      state.token = action.payload.token;
      state.error = null;
      state.success = action.payload.message;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.owner = action.payload.owner;
      state.token = action.payload.token;
      state.error = null;
      state.success = action.payload.message;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.owner = null;
      state.token = null;
      state.error = null;
    },
    clearPopUp: (state) => {
      state.error = null;
      state.success = null;
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  clearPopUp,
} = ownerSlice.actions;

export default ownerSlice.reducer;
