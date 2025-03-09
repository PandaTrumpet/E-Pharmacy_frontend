import { RootState } from "../store";

export const isLoggedSelector = (state: RootState) => state.auth.isLogged;
export const refreshSelector = (state: RootState) => state.auth.isRefreshing;
