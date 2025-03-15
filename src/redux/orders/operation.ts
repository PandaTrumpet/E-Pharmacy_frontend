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
// Интерфейс для данных, которые передаются при обновлении заказа
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

    // if (response.data && response.data.data) {
    //   return response.data.data as IOrders;
    // }
    // console.log(response.data);
    // console.log(response.data.data.orders);

    return response.data.data.orders;
    // return thunkAPI.rejectWithValue("Invalid response from server");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// export const getOrders = createAsyncThunk(
//   "orders/getOrders",
//   async (_, thunkAPI) => {
//     try {
//       const response = await api.get("/cart");
//       console.log(response.data.data[0]);

//       return response.data.data[0];
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "An unexpected error occurred";
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

export const getOrders = createAsyncThunk<
  IOrders,
  void,
  { rejectValue: string }
>("orders/getOrders", async (_, thunkAPI) => {
  try {
    const response = await api.get("/cart");
    const orders = response.data.data;

    if (!Array.isArray(orders) || orders.length === 0) {
      return thunkAPI.rejectWithValue("No orders found");
    }
    console.log(response.data.data[0]);

    return orders[0];
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
export const deleteOrder = createAsyncThunk<void, { orderId: string }>(
  "orders/deleteOrder",
  async (orderId, thunkAPI) => {
    try {
      console.log(orderId);

      await api.post("/cart/delete", orderId);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
