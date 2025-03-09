import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../baseUrl";

export const getStores = createAsyncThunk(
  "stores/getStores",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/stores`);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
