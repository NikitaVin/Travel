import { useDispatch } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import cartSlice from "./cart";
import townsSlice2 from "./towns2";

export const store = configureStore({
  reducer: {
    towns2: townsSlice2,
    filter: filterSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()