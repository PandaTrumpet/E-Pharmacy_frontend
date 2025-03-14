import { RootState } from "../store";

export const totalProductsCount = (state: RootState) =>
  state.order.orders.productsCount;
