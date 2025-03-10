import { configureStore } from "@reduxjs/toolkit";
import reviewsReducer from "./reviews/slice";
import nearestStoreReducer from "./medicineNearestStore/slice";
import storeReducer from "./medicineStore/slice";
import authReducer from "./auth/slice";
import productsReducer from "./products/slice";
const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
    nearestStore: nearestStoreReducer,
    stores: storeReducer,
    auth: authReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
