import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../baseUrl";
import api from "../../interceptor";
import { IProduct } from "./slice";

export const getProducts = createAsyncThunk<
  { products: IProduct[]; total: number },
  { name?: string; category?: string; page?: number; limit?: number },
  { rejectValue: string }
>(
  "products/getProducts",
  async ({ name, category, page = 1, limit }, thunkAPI) => {
    try {
      const params: Record<string, string> = {};

      if (name) params.name = name;
      if (category) params.category = category;
      if (page) params.page = String(page);
      if (limit) params.limit = String(limit);

      const response = await api.get(`${baseUrl}/products`, { params });

      return {
        products: response.data.data,
        total: response.data.pagination.totalProducts,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getProductById = createAsyncThunk<
  IProduct,
  string,
  { rejectValue: string }
>("products/getProductById", async (productId, thunkAPI) => {
  try {
    const response = await api.get(`${baseUrl}/products/${productId}`);

    return response.data.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
