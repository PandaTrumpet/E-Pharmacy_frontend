import { RootState } from "../store";

export const nearestStorsSelector = (state: RootState) =>
  state.nearestStore.stores;
