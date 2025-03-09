import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./operation";

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
}
const initialState: IState = {
  user: null,
  accessToken: "",
  loading: false,
  error: null,
  isLogged: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLogged = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // state.user = action.payload;
        state.isLogged = true;
        state.accessToken = action.payload.accessToken;
      });
  },
});

export default authSlice.reducer;
