import { createSlice } from "@reduxjs/toolkit";
import { getOrders, updateOrder } from "./operation";

export interface IOrderProduct {
  _id: string;
  name: string;
  photo: string;
  suppliers: string;
  quantity: number;
  price: number;
  category: string;
}

interface IOrders {
  paymentMethod: string;
  status: string;
  _id: string;
  ordersProduct: IOrderProduct[];
  userId: string;
  email: string;
  phone: string;
  address: string;
  order_date: string;
  totalPrice: number;
  productsCount: number | null;
  updatedAt: string;
  totalProducts: number | null;
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
    productsCount: null,
    updatedAt: "",
    totalProducts: null,
  },
  loading: false,
  error: null,
};

const orders = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Здесь можно добавить ваши редюсеры
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export default orders.reducer;
