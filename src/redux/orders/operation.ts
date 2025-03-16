import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../interceptor";
import { IProduct } from "../products/slice";

interface IOrders {
  paymentMethod: string;
  status: string;
  _id: string;
  ordersProduct: IProduct[];
  userId: string;
  email: string;
  phone: string;
  address: string;
  order_date: string;
  totalPrice: number;
  productsCount: number;
  updatedAt: string;
  totalProducts: number;
  name: string;
}
interface IOrdersCheckout {
  paymentMethod: string;
  status: string;
  _id?: string;
  ordersProduct: IProduct[];
  userId?: string;
  email: string;
  phone: string;
  address: string;
  order_date?: string;
  totalPrice: number;
  productsCount: number;
  updatedAt?: string;
  totalProducts: number;
  name: string;
}

interface UpdateOrderPayload {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  paymentMethod?: string;
  ordersProduct: IProduct[];
}

export const updateOrder = createAsyncThunk<
  IOrders,
  UpdateOrderPayload,
  { rejectValue: string }
>("orders/updateOrder", async (data, thunkAPI) => {
  try {
    const response = await api.put("/cart/update", data);

    localStorage.setItem("orderId", response.data.data.orders._id);
    console.log(response.data.data.orders);

    return response.data.data.orders;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const checkoutCart = createAsyncThunk<void, IOrdersCheckout>(
  "orders/checkoutCart",
  async (data, thunkAPI) => {
    try {
      await api.post("/cart/checkout", data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
export const getOrders = createAsyncThunk<
  IOrders,
  void,
  { rejectValue: string }
>("orders/getOrders", async (_, thunkAPI) => {
  try {
    const response = await api.get("/cart");
    const orders = response.data.data;

    const orderId = localStorage.getItem("orderId");

    const getOrder = orders.find((el: IOrders) => el._id === orderId);
    console.log(getOrder);
    if (getOrder) {
      return getOrder;
    } else {
      return;
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const deleteOrder = createAsyncThunk<void, { orderId: string }>(
  "orders/deleteOrder",
  async (orderId, thunkAPI) => {
    try {
      await api.post("/cart/delete", orderId);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
