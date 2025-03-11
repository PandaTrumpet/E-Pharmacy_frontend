// import { createSlice } from "@reduxjs/toolkit";
// import { getProductById, getProducts } from "./operation";
// interface IProduct {
//   name: string;
//   photo: string;
//   _id: string;
//   id?: string;
//   suppliers: string;
//   stock: string;
//   price: string;
//   category: string;
// }
// interface IInitialState {
//   loading: boolean;
//   error: string | null;
//   products: IProduct[] | null;
//   product: IProduct | null;
// }

// const initialState: IInitialState = {
//   products: [],
//   product: null,
//   loading: false,
//   error: null,
// };

// const products = createSlice({
//   name: "products",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getProducts.fulfilled, (state, action) => {
//         state.products = action.payload;
//       })
//       .addCase(getProductById.fulfilled, (state, action) => {
//         state.product = action.payload;
//       });
//   },
// });

// export default products.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { getProductById, getProducts } from "./operation";

interface IProduct {
  name: string;
  photo: string;
  _id: string;
  id?: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
}

interface IInitialState {
  loading: boolean;
  error: string | null;
  products: IProduct[]; // Убрали `null`, т.к. массив по умолчанию
  product: IProduct | null;
  totalProducts: number; // Добавили общее количество товаров для пагинации
  currentPage: number; // Добавили текущую страницу
}

const initialState: IInitialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  totalProducts: 0, // Изначально 0
  currentPage: 1, // Начальная страница
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Экшен для обновления текущей страницы (для пагинации)
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.products; // Берем только товары
        state.totalProducts = action.payload.total; // Общее количество товаров
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to load products";
        state.loading = false;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  },
});

export const { setCurrentPage } = products.actions; // Экспорт экшена для обновления страницы
export default products.reducer;
