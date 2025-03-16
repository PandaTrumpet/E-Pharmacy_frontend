import { createAsyncThunk } from "@reduxjs/toolkit";

import { baseUrl } from "../../baseUrl";
import api from "../../interceptor";
interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}
interface RegisterResponse {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  token?: string;
  updatedAt: string;
  createdAt: string;
}

interface LoginPayload {
  email: string;
  password: string;
}
interface LoginResponse {
  accessToken: string;
}
export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/registerUser", async (data, thunkAPI) => {
  try {
    const response = await api.post(`${baseUrl}/user/register`, data);
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async (data, thunkAPI) => {
  try {
    const response = await api.post("/user/login", data, {
      withCredentials: true,
    });
    const accessToken = response.data.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    return response.data.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await api.get("/user/logout");
      localStorage.removeItem("accessToken");
      delete api.defaults.headers.common["Authorization"];
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
