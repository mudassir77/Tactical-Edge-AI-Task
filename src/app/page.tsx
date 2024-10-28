import { getServerSession } from 'next-auth';
import React from 'react'

import { authOptions } from '@/lib/auth';

import EmptyMovie from './components/cards/EmptyMovie';
import MovieList from './components/cards/MovieList';

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
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/movies`, {
    cache: 'no-store'
  });
  const session = await getServerSession(authOptions)

  if (!session) {
    return <EmptyMovie />
  }

  const MovieData: MovieResponse = await response.json();
  const { movies } = MovieData

  const filteredMovies = movies.filter(movie => movie.userId === session.user.id)


  return (
    filteredMovies.length === 0 ?
      <EmptyMovie />
      :
      <MovieList />
  )
}

export default homePage
