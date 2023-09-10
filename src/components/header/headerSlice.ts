import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface HeaderState {
  searchValue: string;
  orderBy: string;
  categories: string[];
  currentCategory: string;
}

const initialState: HeaderState = {
  searchValue: '',
  orderBy: 'relevance',
  categories: [],
  currentCategory: 'all',
};

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },

    setOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload;
    },

    setCategory: (state, action: PayloadAction<string>) => {
      state.currentCategory = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setSearchValue, setOrderBy, setCategory, setCategories } =
  headerSlice.actions;

export default headerSlice.reducer;
