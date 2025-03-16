import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { IStores } from "../medicineNearestStore/slice";
export const getStores = createAsyncThunk<
  IStores[],
  void,
  { rejectValue: string }
>("stores/getStores", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${baseUrl}/stores`);

    return response.data.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
