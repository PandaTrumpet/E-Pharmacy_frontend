// import { createSlice } from "@reduxjs/toolkit";
// interface IInitialState {}
// const initialState = {
//   orderId: "",
//   orders: {
//     paymentMethod: "",
//     status: "",
//     _id: "",
//     ordersProduct: [],
//   },
// };
// const orders = createSlice({
//   name: "orders",
//   initialState,
//   reducers: {},
// });
import { createSlice } from "@reduxjs/toolkit";
import { updateOrder } from "./operation";

interface IOrderProduct {
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
  productsCount: number;
  updatedAt: string;
  totalProducts: number;
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
  reducers: {
    // Здесь можно добавить ваши редюсеры
  },
  extraReducers: (builder) => {
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export default orders.reducer;
