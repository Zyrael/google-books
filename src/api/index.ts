import { Book } from '../components/booksList/booksListSlice';
import { BOOKSURL } from '../constants';

const getId = () => {
  let id = 0;
  return () => id++;
};

const id = getId();

const bookReducer = (
  {
    booksList,
    bookCategories,
  }: { booksList: Book[]; bookCategories: string[] },
  {
    selfLink,
    volumeInfo: {
      title,
      authors = [],
      description,
      categories = [],
      imageLinks: { thumbnail } = { thumbnail: '' },
    },
  }: {
    selfLink: string;
    volumeInfo: {
      title: string;
      authors: string[];
      description: string;
      categories: string[];
      imageLinks: { thumbnail: string };
    };
  }
) => {
  return {
    booksList: [
      ...booksList,
      {
        id: id(),
        title,
        authors,
        description,
        category: categories[0] !== undefined ? categories[0] : null,
        thumbnail,
        selfLink,
      },
    ],
    bookCategories:
      categories[0] !== undefined
        ? [...new Set([...bookCategories, categories[0]])]
        : [...bookCategories],
  };
};

export const fetchBooks = async (
  value: string,
  startIndex: number,
  orderBy = 'relevance'
) => {
  const url = new URL(BOOKSURL);
  url.searchParams.set('q', value);
  url.searchParams.set('startIndex', `${startIndex}`);
  url.searchParams.set('maxResults', '30');
  url.searchParams.set('orderBy', orderBy);
  url.searchParams.set(
    'key',
    import.meta.env.DEV ? import.meta.env.VITE_APIKEY : process.env.APIKEY
  );

  const response = await fetch(url.href);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  const { totalItems, items } = data;

  const { booksList, bookCategories } = items.reduce(bookReducer, {
    booksList: [],
    bookCategories: [],
  });

  return { totalItems, booksList, bookCategories };
};
