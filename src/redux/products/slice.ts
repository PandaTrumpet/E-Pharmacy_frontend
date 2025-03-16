import { createSlice } from "@reduxjs/toolkit";
import { getProductById, getProducts } from "./operation";

export interface IProduct {
  name: string;
  photo: string;
  _id: string;
  suppliers: string;
  quantity: number;
  price: number;
  category: string;
  remove: boolean;
}

interface IInitialState {
  loading: boolean;
  error: string | null;
  products: IProduct[];
  product: IProduct | null;
  totalProducts: number;
  currentPage: number;
}

const initialState: IInitialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  totalProducts: 0,
  currentPage: 1,
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalProducts = action.payload.total;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to load products";
        state.loading = false;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  },
});

export const { setCurrentPage } = products.actions;
export default products.reducer;
