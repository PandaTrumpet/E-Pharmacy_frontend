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
  error: string | null;
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
        // state.isLogged = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.isRefreshing = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // state.user = action.payload;
        state.isLogged = true;
        state.accessToken = action.payload.accessToken;
        state.isRefreshing = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isRefreshing = false;
        // state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLogged = false;
        localStorage.removeItem("accessToken");
      });
  },
});

export default authSlice.reducer;
