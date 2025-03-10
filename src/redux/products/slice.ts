import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./operation";
interface IProduct {
  name: string;
  photo: string;
  _id: string;
  id: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
}
interface IInitialState {
  loading: boolean;
  error: string | null;
  products: IProduct[] | null;
  product: IProduct | null;
}

const initialState: IInitialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default products.reducer;
