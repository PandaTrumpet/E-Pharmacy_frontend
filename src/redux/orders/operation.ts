// import { createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../interceptor";
// export const updateOrder = createAsyncThunk(
//   "orders/updateOrder",

//   async (data, thunkAPI) => {
//     try {
//       const response = await api.put("/cart/update", data);
//       return response.data.data;
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : String(error);
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../interceptor";

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

// Интерфейс для данных, которые передаются при обновлении заказа
interface UpdateOrderPayload {
  orderId: string;
  // Добавьте другие поля, необходимые для обновления заказа,
  // например: status, ordersProduct и т.д.
}

export const updateOrder = createAsyncThunk<
  IOrders,
  UpdateOrderPayload,
  { rejectValue: string }
>("orders/updateOrder", async (data, thunkAPI) => {
  try {
    const response = await api.put("/cart/update", data);
    return response.data.data as IOrders;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
