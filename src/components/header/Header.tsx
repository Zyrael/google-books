import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg';
import { setSearchValue, setOrderBy, setCategory } from './headerSlice';
import { RootState } from '../../store';

interface Props {
  loadBooks: () => void;
}

export default function Header({ loadBooks }: Props) {
  const dispatch = useDispatch();
  const { searchValue, orderBy, currentCategory, categories } = useSelector(
    (state: RootState) => state.header
  );

  return (
    <div className='flex w-full items-center flex-col pb-4 drop-shadow-lg'>
      <h1 className='text-4xl'>Search for Books</h1>
      <div className='mt-4 h-10 w-80 relative'>
        <input
          type='text'
          name='search'
          id='search'
          className='border-2 h-full w-full border-black pl-2 pr-9 outline-none rounded-md text-xl'
          value={searchValue}
          onChange={(e) => dispatch(setSearchValue(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') loadBooks();
          }}
        />
        <button
          type='button'
          className='ml-4 text-xl h-8 w-8 p-1 rounded-md absolute right-1 top-1 hover:bg-slate-300 flex justify-center items-center'
          onClick={() => loadBooks()}
        >
          <SearchIcon className='w-4 h-4' />
        </button>
      </div>
      <div className='w-full flex justify-center mt-4 text-xl'>
        <label htmlFor='category'>
          Categories
          <select
            name='category'
            id='category'
            className='ml-2'
            value={currentCategory}
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            <option value='all'>All</option>
            {categories.map((currentCategory, index) => (
              <option key={index} value={currentCategory.toLowerCase()}>
                {currentCategory}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor='orderBy' className='ml-10'>
          Order by&nbsp;
          <select
            name='orderBy'
            id='orderBy'
            className='ml-2'
            value={orderBy}
            onChange={(e) => {
              dispatch(setOrderBy(e.target.value));
              loadBooks();
            }}
          >
            <option value='relevance'>Relevance</option>
            <option value='newest'>Newest</option>
          </select>
        </label>
      </div>
    </div>
  );
}
