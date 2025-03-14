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
  // stock: string;
  quantity: number;
  price: number;
  category: string;
}

// export const getProducts = createAsyncThunk<
//   IProduct[],
//   { name?: string; category?: string; page?: number; limit?: number },
//   { rejectValue: string }
// >(
//   "products/getProducts",
//   async ({ name, category, page = 1, limit }, thunkAPI) => {
//     try {
//       // ✅ Объявляем params с явным указанием типа
//       const params: Record<string, string> = {};

//       if (name) params.name = name;
//       if (category) params.category = category;
//       if (page) params.page = String(page); // ✅ Приводим число к строке
//       if (limit) params.limit = String(limit); // ✅ Приводим число к строке

//       // ✅ Отправляем GET-запрос с параметрами
//       const response = await api.get(`${baseUrl}/products`, { params });
//       console.log(response.data);
//       const products = response.data.data;
//       const total = response.data.pagination.totalProducts;
//       return { products, total };
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : String(error);
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

export const getProducts = createAsyncThunk<
  { products: IProduct[]; total: number }, // Исправленный тип возвращаемых данных
  { name?: string; category?: string; page?: number; limit?: number },
  { rejectValue: string }
>(
  "products/getProducts",
  async ({ name, category, page = 1, limit }, thunkAPI) => {
    try {
      // ✅ Объявляем params с явным указанием типа
      const params: Record<string, string> = {};

      if (name) params.name = name;
      if (category) params.category = category;
      if (page) params.page = String(page); // ✅ Приводим число к строке
      if (limit) params.limit = String(limit); // ✅ Приводим число к строке

      // ✅ Отправляем GET-запрос с параметрами
      const response = await api.get(`${baseUrl}/products`, { params });
      // console.log(response.data);

      return {
        products: response.data.data,
        total: response.data.pagination.totalProducts, // Теперь totalProducts явно возвращается
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
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
