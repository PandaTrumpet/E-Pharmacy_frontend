import { RootState } from "../store";

export const productsSelector = (state: RootState) => state.products.products;
export const productsLoadingSelector = (state: RootState) =>
  state.products.loading;
export const productsErrorSelector = (state: RootState) => state.products.error;
export const productSelectorById = (state: RootState) => state.products.product;
