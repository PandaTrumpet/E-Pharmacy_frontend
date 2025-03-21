import { RootState } from "../store";

export const totalProductsCountSelector = (state: RootState) =>
  state.order.orders.productsCount || 0;
export const totalProductsPriceSelector = (state: RootState) =>
  state.order.orders.totalPrice || 0;
export const addedProductsSelector = (state: RootState) =>
  state.order.orders.ordersProduct;
export const totalPriceSelector = (state: RootState) =>
  state.order.orders.totalPrice || 0;
export const isLoadingProducts = (state: RootState) => state.order.loading;

export const selectOrder = (state: RootState) => state.order.orders || [];
export const userIdSelector = (state: RootState) =>
  state.order.orders.userId || null;
