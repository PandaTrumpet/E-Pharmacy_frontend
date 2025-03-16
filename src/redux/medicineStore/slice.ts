import { createSlice } from "@reduxjs/toolkit";
import { IStores } from "../medicineNearestStore/slice";
import { getStores } from "./operation";

interface IInitialState {
  stores: IStores[] | null;
  loading: boolean;
  error: null | string;
}
const initialState: IInitialState = {
  stores: [],
  loading: false,
  error: null,
};
const stores = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStores.fulfilled, (state, action) => {
        state.stores = action.payload;
        state.loading = false;
      })
      .addCase(getStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.error = action.payload || "Failed to load stores";
        state.loading = false;
      });
  },
});

export default stores.reducer;
