import { useDispatch } from 'react-redux';
import { setCurrentBook } from '../../../appSlice';
import { Link } from 'react-router-dom';
import { Book } from '../booksListSlice';

interface Props {
  book: Book;
}

export default function BookItem({ book }: Props) {
  const dispatch = useDispatch();

  return (
    <Link
      to={`books/${book.id}`}
      className='bg-gray-200 w-full flex flex-col p-4 transition-transform hover:scale-105 cursor-pointer active:scale-100'
      onClick={() => dispatch(setCurrentBook(book))}
    >
      <div className='flex justify-center mb-4'>
        <img
          height='180px'
          width='128px'
          src={book.thumbnail}
          alt={book.title}
          className='shadow-xl'
        />
      </div>

      {book.category ? <div>{book.category}</div> : null}
      <div className='text-xl font-bold max-w-full line-clamp-4'>
        {book.title}
      </div>
      {book.authors.length !== 0 && <div>{book.authors.join(', ')}</div>}
    </Link>
  );
}
