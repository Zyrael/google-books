import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import BookItem from './bookItem/BookItem';

interface Props {
  loadMore: () => void;
}

export default function BooksList({ loadMore }: Props) {
  const { totalBooks, booksList, loadedCount } = useSelector(
    (state: RootState) => state.booksList
  );

  const { appState, error } = useSelector((state: RootState) => state.app);

  const { currentCategory } = useSelector((state: RootState) => state.header);

  const showBooks =
    currentCategory === 'all'
      ? booksList
      : booksList.filter(
          (book) =>
            book.category?.toLowerCase() === currentCategory.toLowerCase()
        );

  return (
    <div className='flex flex-col items-center overflow-auto px-4 h-full'>
      {totalBooks !== 0 && (
        <div className='text-2xl'>Found {totalBooks} results</div>
      )}
      <div className='w-full mt-4'>
        {appState === 'error' ? (
          <div className='text-3xl text-red-700'>{error}</div>
        ) : null}
        {appState === 'loading' ? (
          <div className='text-4xl w-full h-full flex justify-center'>
            Loading...
          </div>
        ) : (
          <div className='grid md:grid-cols-auto-fill grid-cols-1 md:justify-between justify-center w-full gap-4'>
            {showBooks.length !== 0 &&
              showBooks.map((book) => <BookItem key={book.id} book={book} />)}
          </div>
        )}
      </div>

      {loadedCount < totalBooks ? (
        <button
          type='button'
          onClick={() => loadMore()}
          className='bg-slate-300 p-2 rounded-lg mt-4 text-2xl'
          disabled={appState === 'loading more'}
        >
          {appState === 'loading more' ? 'Loading...' : 'Load more'}
        </button>
      ) : null}
    </div>
  );
}
