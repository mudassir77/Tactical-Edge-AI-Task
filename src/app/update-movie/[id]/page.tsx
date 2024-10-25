import React from 'react';

import NewMovieCard from '@/app/components/cards/NewMovieCard';
import BackgroundWrapper from '@/app/components/wrapper/BackgroundWrapper';

const fetchMovie = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/movies/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch movie');
  }
  return res.json();
};

const UpdateMovie = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const movie = await fetchMovie(id);

    return (
      <BackgroundWrapper>
        <div className='p-6 lg:p-[120px] pt-20 lg:pt-[120px] flex flex-col gap-[80px] lg:gap-[120px]'>
          <p className='font-primary text-[32px] lg:text-5xl leading-10 lg:leading-14 text-white font-semibold'>Edit</p>
          <NewMovieCard buttonText='Update' movie={movie} />
        </div>
      </BackgroundWrapper>
    );
  } catch (error) {
    return (
      <BackgroundWrapper>
        <div className='p-6 lg:p-[120px] pt-20 lg:pt-[120px] flex flex-col gap-[80px] lg:gap-[120px]'>
          <p className='text-red-500'>Failed to fetch movie. Please try again later.</p>
        </div>
      </BackgroundWrapper>
    );
  }
};

export default UpdateMovie;
