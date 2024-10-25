import React from 'react'

import NewMovieCard from '../components/cards/NewMovieCard'
import BackgroundWrapper from '../components/wrapper/BackgroundWrapper'

const createMovie = () => {
    return (
        <BackgroundWrapper>
            <div className='p-6 lg:p-[120px] pt-20 lg:pt-[120px] flex flex-col gap-[80px] lg:gap-[120px] '>
                <p className='font-primary text-[32px] lg:text-5xl leading-10 lg:leading-14 text-white font-semibold'>Create a new movie </p>
                <NewMovieCard />
            </div>
        </BackgroundWrapper>
    )
}

export default createMovie
