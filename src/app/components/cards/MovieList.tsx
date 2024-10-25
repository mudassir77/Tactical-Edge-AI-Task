'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { signOut } from 'next-auth/react';

import { APP_IMAGES } from '@/constant/image';
import MovieCard from './MovieCard';
import BackgroundWrapper from '../wrapper/BackgroundWrapper';

const ITEMS_PER_PAGE = 8;

interface IMovie {
  id: number;
  name: string;
  year: string;
  img: string;
}

interface Props {
  movies: IMovie[];
}

const MovieList = ({ movies }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLgScreen, setIsLgScreen] = useState<boolean>(false);
  const router = useRouter();

  // Calculate total pages based on `movies` array length
  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const handleResize = () => {
      setIsLgScreen(window.innerWidth >= 1024); // Check if screen width is large (lg) or above
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  const handleClickPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleClickNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page: number) => setCurrentPage(page);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMovies = movies?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleOnClick = useCallback((path: string) => router.push(path), [router]);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <BackgroundWrapper style='-bottom-120'>
      <div className='p-6 lg:p-[120px] pt-20 lg:pt-[120px] flex flex-col gap-[120px] h-full '>
        <div className='flex gap-10 justify-between items-center'>
          <div className='flex items-center justify-center gap-3'>
            <p className='text-white font-primary text-[32px] leading-10 lg:text-5xl lg:leading-14 font-semibold whitespace-nowrap'>My movies</p>
            <IoMdAddCircleOutline className='text-white w-6 h-6 lg:w-8 lg:h-8 mt-2 cursor-pointer' onClick={() => handleOnClick('/create-movie')} />
          </div>
          <div className='flex items-center justify-center gap-3 cursor-pointer' onClick={handleLogout}>
            <p className='text-white font-primary text-base leading-6 font-bold lg:block hidden'>Logout</p>
            <Image
              className='object-contain w-6 h-6 lg:w-8 lg:h-8'
              src={APP_IMAGES.logout}
              width='800'
              height='658'
              alt=''
            />
          </div>
        </div>
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4 lg:gap-6'>
          {currentMovies.map((item: IMovie) => (
            <MovieCard data={item} key={item.id} />
          ))}
        </div>
        {/* Pagination Controls */}
        {isLgScreen && totalPages >= 1 && (
          <div className='flex gap-2 w-full justify-center items-center mt-6'>
            <button
              className='font-bold font-primary text-white text-base leading-4'
              onClick={handleClickPrev}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
              <button
                key={page}
                className={`font-bold font-primary text-white text-base leading-4 py-3 px-3 ${currentPage === page ? 'bg-buttonGreen' : 'bg-cardGreen'} rounded-md`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            ))}
            <button
              className='font-bold font-primary text-white text-base leading-4'
              onClick={handleClickNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </BackgroundWrapper>
  );
};

export default React.memo(MovieList);
