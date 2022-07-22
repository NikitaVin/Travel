import { RootState } from '../index';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface TownsType {
   id: string,
  imageUrl: string,
  title: string,
  types: number[],
  days: number[],
  price: number,
}

interface TownsSliceState {
   towns: TownsType[],
  isLoading: boolean,
}

const initialState: TownsSliceState = {
  towns: [],
  isLoading: true,
};


export const getAsyncTowns = createAsyncThunk<TownsType[], Record<string, string>>(
  "towns/getAsyncTowns",
  async (params) => {
    const { order, sortBy, category, currentPage } = params;
    const response = await axios.get(
      `https://62b9929eff109cd1dc9590fa.mockapi.io/towns?page=${currentPage}&limit=3&${category}&sortBy=${sortBy}&order=${order}`
    );
    return response.data;
  }
);


const townsSlice = createSlice({
  name: "towns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAsyncTowns.pending, (state) => {
      state.isLoading = true;
   })

    builder.addCase(getAsyncTowns.fulfilled, (state, action) => {
      state.towns = action.payload;
      state.isLoading = false;
   })
      
   builder.addCase(getAsyncTowns.rejected, (state) => {
      console.log("err", state);
      alert("Произошла ошибка, попробуйте обновить страницу");
      state.isLoading = false;
   })
  },
});

export const townsSelector = (state: RootState) => state.towns2


export default townsSlice.reducer;
