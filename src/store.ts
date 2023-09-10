import { configureStore } from '@reduxjs/toolkit';
import booksListSlice from './components/booksList/booksListSlice';
import headerSlice from './components/header/headerSlice';
import appSlice from './appSlice';

export const store = configureStore({
  reducer: {
    booksList: booksListSlice,
    header: headerSlice,
    app: appSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
