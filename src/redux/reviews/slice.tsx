import { createSlice } from "@reduxjs/toolkit";
import { getReviews } from "./opertaion";
interface IReviews {
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
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
    });
  },
});

export default reviewsSlice.reducer;
