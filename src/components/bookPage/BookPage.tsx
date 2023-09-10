import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Book } from '../booksList/booksListSlice';
import { useEffect, useState } from 'react';

export default function BookPage() {
  const [imgLink, setImgLink] = useState('');
  const { currentBook } = useSelector((state: RootState) => state.app);
  const { title, description, authors, category, selfLink } =
    currentBook as unknown as Book;

  useEffect(() => {
    fetch(selfLink).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setImgLink(data.volumeInfo.imageLinks.medium);
        });
      }
    });
  }, [selfLink]);

  return (
    <div className='flex h-full flex-col md:flex-row'>
      <div className='flex-[2] flex justify-center items-center bg-slate-200'>
        <img
          height={'500px'}
          width={'400px'}
          src={imgLink}
          alt='title'
          className='shadow-xl'
        />
      </div>
      <div className='flex-[3] flex flex-col px-8 py-4'>
        <div className='text-2xl'>{category}</div>
        <div className='font-bold text-4xl mt-4'>{title}</div>
        <div className='mt-4 underline text-slate-800'>
          {authors.join(', ')}
        </div>
        <div className='p-4 border-2 md:w-2/3 mt-4'>{description}</div>
      </div>
    </div>
  );
}
