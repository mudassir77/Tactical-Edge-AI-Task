import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

import { APP_IMAGES } from '@/constant/image';
interface MovieCard {
    id: number;
    img: string;
    name: string;
    year: string;
}
interface MovieCardProps {
    data: MovieCard
}
const MovieCard = ({ data }: MovieCardProps) => {
    return (
        <div className='rounded-md bg-cardGreen lg:p-2 cursor-pointer'>
            <Link href={`/update-movie/${data.id}`}>
                <Image
                    className='object-contain rounded-t-md lg:rounded-md '
                    src={data.img !== '' ? data.img : APP_IMAGES.movie}
                    width='800'
                    height='658'
                    alt=''
                />
                <div className='p-4 flex flex-col gap-4 lg:gap-2'>
                    <p className='text-white font-primary font-medium text-sm leading-6 lg:text-[20px] lg:leading-8'>{data.name}</p>
                    <p className='text-white font-primary font-normal text-sm leading-6'>{data.year}</p>
                </div>
            </Link>
        </div>
    )
}

export default React.memo(MovieCard)
