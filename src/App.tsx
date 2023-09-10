import { useDispatch, useSelector } from 'react-redux';
import {
  setBooks,
  addBooks,
  incrementLoadedCount,
  resetLoadedCount,
} from './components/booksList/booksListSlice';
import { fetchBooks } from './api';
import { RootState } from './store';
import { MAXRESULTS } from './constants';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { setCurrentBook, setState } from './appSlice';
import { setCategories } from './components/header/headerSlice';
import { BookPage, BooksList, Header } from './components';
import { debounce } from './utils';

export default function App() {
  const { loadedCount } = useSelector((state: RootState) => state.booksList);
  const { searchValue, orderBy } = useSelector(
    (state: RootState) => state.header
  );

  const dispatch = useDispatch();

  const loadBooks = async () => {
    dispatch(setState({ appState: 'loading', error: null }));
    dispatch(setCurrentBook(null));
    dispatch(resetLoadedCount());
    try {
      const { totalItems, booksList, bookCategories } = await fetchBooks(
        searchValue,
        loadedCount,
        orderBy
      );
      dispatch(setCategories(bookCategories));
      dispatch(setBooks({ totalBooks: totalItems, booksList }));
      dispatch(incrementLoadedCount(MAXRESULTS));
      dispatch(setState({ appState: 'loaded', error: null }));
    } catch (e) {
      dispatch(setState({ appState: 'error', error: e as string }));
    }
  };

  const loadMore = async () => {
    dispatch(setState({ appState: 'loading more', error: null }));
    try {
      const { booksList, bookCategories } = await fetchBooks(
        searchValue,
        loadedCount,
        orderBy
      );
      setCategories(bookCategories);
      dispatch(addBooks(booksList));
      dispatch(incrementLoadedCount(MAXRESULTS));
      dispatch(setState({ appState: 'loaded', error: null }));
    } catch (e) {
      dispatch(setState({ appState: 'error', error: e as string }));
    }
  };

  const debouncedLoad = debounce(loadBooks);
  const debouncedLoadmore = debounce(loadMore);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <BooksList loadMore={debouncedLoadmore} />,
    },
    {
      path: '/books/:id',
      element: <BookPage />,
    },
  ]);

  return (
    <div className='flex h-[100vh] w-[100wv] flex-col px-4 py-2'>
      <Header loadBooks={debouncedLoad} />
      <RouterProvider router={router} />
    </div>
  );
}
