import { createSlice } from "@reduxjs/toolkit";
import { getNearestStores } from "./operation";
export interface IStores {
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: number;
  _id: string;
}
interface IInitialState {
  stores: IStores[] | null;
  loading: boolean;
  error: string | null;
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
    builder.addCase(getNearestStores.fulfilled, (state, action) => {
      state.stores = action.payload;
    });
  },
});

export default medicineNearestStore.reducer;
