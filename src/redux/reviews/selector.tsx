import { RootState } from "../store";

export const reviewsSelector = (state: RootState) => state.reviews.reviews;
