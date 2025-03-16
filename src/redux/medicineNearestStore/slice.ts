import { createSlice } from "@reduxjs/toolkit";
import { getNearestStores } from "./operation";
export interface IStores {
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: number;
  _id: string;
  status: string;
}
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
const medicineNearestStore = createSlice({
  name: "medicineNearestStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNearestStores.fulfilled, (state, action) => {
        state.stores = action.payload;
        state.loading = false;
      })
      .addCase(getNearestStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNearestStores.rejected, (state, action) => {
        state.error = action.payload || "Failed to load stores";
        state.loading = false;
      });
  },
});

export default medicineNearestStore.reducer;
