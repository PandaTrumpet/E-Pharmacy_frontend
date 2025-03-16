import { createSlice } from "@reduxjs/toolkit";
import { checkoutCart, getOrders, updateOrder } from "./operation";
import { IProduct } from "../products/slice";

interface IOrders {
  paymentMethod: string;
  status: string;
  _id: string;
  ordersProduct: IProduct[] | [];
  userId: string;
  email: string;
  phone: string;
  address: string;
  order_date: string;
  totalPrice: number;
  productsCount: number | 0;
  updatedAt?: string;
  totalProducts: number | 0;
}

interface IInitialState {
  orderId: string;
  orders: IOrders;
  loading: boolean;
  error: string | null;
}

const initialState: IInitialState = {
  orderId: "",
  orders: {
    paymentMethod: "",
    status: "",
    _id: "",
    ordersProduct: [],
    userId: "",
    email: "",
    phone: "",
    address: "",
    order_date: "",
    totalPrice: 0,
    productsCount: 0,
    updatedAt: "",
    totalProducts: 0,
  },
  loading: false,
  error: null,
};

const orders = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update!";
      })

      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.rejected, (state, acion) => {
        state.loading = false;
        state.error = acion.payload || "Failed to get orders";
      })
      .addCase(checkoutCart.fulfilled, (state) => {
        state.orders = {} as IOrders;
        localStorage.removeItem("orderId");
        state.loading = false;
      })
      .addCase(checkoutCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to checkout!";
      });
  },
});

export default orders.reducer;
