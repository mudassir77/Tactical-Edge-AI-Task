import React from 'react'

import EmptyMovie from '@/app/components/cards/EmptyMovie';
import MovieList from '@/app/components/cards/MovieList';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { headers } from 'next/headers';


interface Movie {
  id: number;
  name: string;
  year: string;
  img: string;
  userId: string;
}
interface MovieResponse {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
}

const homePage = async () => {
  try {
    const session = await getServerSession(authOptions)
    console.log("THIS IS SESSION", session)
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/movies`, {
      cache: 'no-store',
      headers: headers()
    });

    const MovieData: MovieResponse = await response.json();
    const { movies } = MovieData

    return (
      movies.length === 0 ?
        <EmptyMovie />
        :
        <MovieList />
    )

  } catch (error) {
    console.error(error);
    return <div>
      <h1 className='text-white flex justify-center items-center h-screen'>Failed to fetch movies</h1>
    </div>

  }
}

export default homePage
