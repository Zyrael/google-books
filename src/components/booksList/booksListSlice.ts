import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Book = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  authors: string[];
  category: string;
  selfLink: string;
};

export interface BooksListState {
  totalBooks: number;
  loadedCount: number;
  booksList: Book[];
}

const initialState: BooksListState = {
  totalBooks: 0,
  loadedCount: 0,
  booksList: [],
};

export const booksListSlice = createSlice({
  name: 'bookList',
  initialState,
  reducers: {
    setBooks: (
      state,
      action: PayloadAction<{ totalBooks: number; booksList: Book[] }>
    ) => {
      state.totalBooks = action.payload.totalBooks;
      state.booksList = action.payload.booksList;
    },

    addBooks: (state, action: PayloadAction<Book[]>) => {
      state.booksList = [...state.booksList, ...action.payload];
    },
    incrementLoadedCount: (state, action: PayloadAction<number>) => {
      state.loadedCount += action.payload;
    },
    resetLoadedCount: (state) => {
      state.loadedCount = 0;
    },
  },
});

export const { setBooks, addBooks, incrementLoadedCount, resetLoadedCount } =
  booksListSlice.actions;

export default booksListSlice.reducer;
