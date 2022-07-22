import { RootState } from './../index';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SortType {
      name: string,
      sortProperty: string,
}

interface FilterSliceState {
   searchValue?: string,
  countryId?: number,
  currentPage?: number,
  sort: SortType
}

const initialState: FilterSliceState = {
  searchValue: "",
  countryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCountryId: (state, action: PayloadAction<number>) => {
      state.countryId = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.countryId = Number(action.payload.countryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      
    },
  },
});

export const filterSelector = ({ filter }: RootState) => filter
export const selectorSort = ({ filter }: RootState) => filter.sort;

export const {
  setCountryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
