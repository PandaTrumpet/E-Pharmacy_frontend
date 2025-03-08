import { configureStore } from "@reduxjs/toolkit";
import reviewsReducer from "./reviews/slice";
import nearestStoreReducer from "./medicineNearestStore/slice";
const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
    nearestStore: nearestStoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
