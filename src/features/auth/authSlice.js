import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [], // Lista de usuarios registrados
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,
  registerError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginError: (state, action) => {
      state.error = action.payload;
    },
    registerSuccess: (state, action) => {
      state.users.push(action.payload);
      state.registerError = null;
    },
    registerError: (state, action) => {
      state.registerError = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const {
  loginSuccess,
  loginError,
  logout,
  registerSuccess,
  registerError,
} = authSlice.actions;
export default authSlice.reducer;
