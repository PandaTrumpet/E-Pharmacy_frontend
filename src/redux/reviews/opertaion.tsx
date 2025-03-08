import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/customer-reviews`);
      //   console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
