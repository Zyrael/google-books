import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Book } from './components/booksList/booksListSlice';

export interface AppState {
  appState: 'loaded' | 'loading' | 'loading more' | 'error';
  error: string | null;
  currentBook: Book | null;
}

const initialState: AppState = {
  appState: 'loaded',
  error: null,
  currentBook: null,
};

export const booksListSlice = createSlice({
  name: 'bookList',
  initialState,
  reducers: {
    setState: (
      state,
      action: PayloadAction<{
        appState: 'loaded' | 'loading' | 'loading more' | 'error';
        error: string | null;
      }>
    ) => {
      state.appState = action.payload.appState;
      state.error = action.payload.error;
    },
    setCurrentBook: (state, action: PayloadAction<Book | null>) => {
      state.currentBook = action.payload;
    },
  },
});

export const { setState, setCurrentBook } = booksListSlice.actions;

export default booksListSlice.reducer;
