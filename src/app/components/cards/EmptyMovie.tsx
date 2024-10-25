'use client'
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'

import AppButton from '@/components/buttons/AppButton';

import BackgroundWrapper from '../wrapper/BackgroundWrapper';

interface IMovie {
    id: number;
    name: string;
    year: string;
    img: string;
}
interface Props {
    movies: IMovie[];
}

const EmptyMovie = ({ movies }: Props) => {
    const router = useRouter();

    const handleOnClick = useCallback((path: string) => {
        router.push(path);
    }, [router]);


    return (
        movies.length === 0 ?
            <>
                <BackgroundWrapper>
                    <div className='flex items-center justify-center h-screen flex-col gap-10'>
                        <p className='font-primary text-[32px] lg:text-5xl leading-10 lg:leading-14 text-white font-semibold'>Your movie list is empty</p>
                        <AppButton text='Add a new movie' style='max-w-max' onClick={() => handleOnClick('/create-movie')} />
                    </div>
                </BackgroundWrapper>
            </>
            : null
    )
}

export default EmptyMovie
