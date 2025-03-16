import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { IReviews } from "./slice";

export const getReviews = createAsyncThunk<
  IReviews[],
  void,
  { rejectValue: string }
>("reviews/getReviews", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/customer-reviews`);

    return response.data.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
