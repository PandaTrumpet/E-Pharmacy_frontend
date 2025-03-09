import { createSlice } from "@reduxjs/toolkit";
import { IStores } from "../medicineNearestStore/slice";
import { getStores } from "./operation";

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
const stores = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStores.fulfilled, (state, action) => {
      state.stores = action.payload;
    });
  },
});

export default stores.reducer;
