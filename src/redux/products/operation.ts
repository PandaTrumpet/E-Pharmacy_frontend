// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { baseUrl } from "../../baseUrl";
// import api from "../../interceptor";
// interface IProduct {
//   name: string;
//   photo: string;
//   _id: string;
//   id: string;
//   suppliers: string;
//   stock: string;
//   price: string;
//   category: string;
// }
// export const getProducts = createAsyncThunk<
//   IProduct[],
//   void,
//   { rejectValue: string }
// >("products/getProducts", async (_, thunkAPI) => {
//   try {
//     const response = await api.get(`${baseUrl}/products`);
//     // console.log(response.data.data);
//     return response.data.data;
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : String(error);
//     return thunkAPI.rejectWithValue(errorMessage);
//   }
// });
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../baseUrl";
import api from "../../interceptor";

interface IProduct {
  name: string;
  photo: string;
  _id: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
}

export const getProducts = createAsyncThunk<
  IProduct[],
  { name?: string; category?: string },
  { rejectValue: string }
>("products/getProducts", async ({ name, category }, thunkAPI) => {
  try {
    const params: Record<string, string> = {};
    if (name) params.name = name;
    if (category) params.category = category;

    const response = await api.get(`${baseUrl}/products`, { params });

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
