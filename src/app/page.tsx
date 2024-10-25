import React from 'react'

import EmptyMovie from './components/cards/EmptyMovie';
import MovieList from './components/cards/MovieList';


const homePage = async () => {

  const data = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/movies`);
  const MovieData = await data.json();
  console.log(MovieData);

  return (
    MovieData.length === 0 ?
      <EmptyMovie movies={MovieData} />
      :
      <MovieList movies={MovieData} />
  )
}

export default homePage
