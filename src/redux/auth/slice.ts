import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./operation";

interface IUser {
  _id: string;
  name?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
}
interface IState {
  user: IUser | null;
  loading: boolean;
  error: null | string;
  isLogged: boolean;
  accessToken?: string | null;
  isRefreshing: boolean;
}
const initialState: IState = {
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  loading: false,
  error: null,
  isLogged: localStorage.getItem("accessToken") ? true : false,
  isRefreshing: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload || "Failed to register!";
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.isRefreshing = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLogged = true;
        state.accessToken = action.payload.accessToken;
        state.isRefreshing = false;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || "Failed to login!";
        state.isRefreshing = false;
        state.loading = false;
        state.isLogged = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLogged = false;
        localStorage.removeItem("accessToken");
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to logout!";
      });
  },
});

export default authSlice.reducer;
