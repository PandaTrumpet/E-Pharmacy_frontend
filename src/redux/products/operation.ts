import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../baseUrl";
import api from "../../interceptor";
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
export const getProducts = createAsyncThunk<
  IProduct[],
  void,
  { rejectValue: string }
>("products/getProducts", async (_, thunkAPI) => {
  try {
    const response = await api.get(`${baseUrl}/products`);
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const getProductById = createAsyncThunk<
  IProduct,
  string,
  { rejectValue: string }
>("products/getProductById", async (productId, thunkAPI) => {
  try {
    const response = await api.get(`${baseUrl}/products/${productId}`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
