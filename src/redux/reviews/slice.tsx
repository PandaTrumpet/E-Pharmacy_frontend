import { createSlice } from "@reduxjs/toolkit";
import { getReviews } from "./opertaion";
export interface IReviews {
  _id: string;
  name: string;
  testimonial: string;
}

interface IInitialState {
  reviews: IReviews[] | null;
  loading: boolean;
  error: string | null;
}
const initialState: IInitialState = {
  reviews: [],
  loading: false,
  error: null,
};
const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.error = action.payload || "Failed with reviews!";
        state.loading = false;
      });
  },
});

export default reviewsSlice.reducer;
