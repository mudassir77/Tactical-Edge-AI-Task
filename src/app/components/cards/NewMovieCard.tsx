'use client'
import React, { useEffect, useState } from 'react';
import { HiOutlineDownload } from "react-icons/hi";

import MovieDetailInputcard from './MovieDetailInputcard';

interface IMovie {
    id: number;
    name: string;
    year: number;
    img: string;
}

interface NewMovieCardProps {
    buttonText?: string;
    movie?: IMovie;
}

const NewMovieCard = ({ buttonText, movie }: NewMovieCardProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [imgUrl, setImgUrl] = useState<string | undefined>(movie?.img);

    const handleFileProcessing = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    setImgUrl(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setImgUrl(movie?.img);
        }
    };

    useEffect(() => {
        handleFileProcessing(file);
    }, [file]);

    return (
        <div className='flex gap-[127px] flex-col-reverse lg:flex-row'>
            <div
                className={`relative w-[35%] h-[504px] rounded-md bg-inputGreen border border-dotted border-white lg:flex items-center justify-center ${imgUrl ? '' : 'hidden'
                    }`}
                style={{
                    backgroundImage: imgUrl ? `url(${imgUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: imgUrl ? 0.7 : 1,
                }}
            >
                <label htmlFor='files' className='absolute w-full h-full z-10 flex items-center justify-center bg-inputGreen opacity-50 rounded-md'>
                    <div className='flex flex-col items-center gap-2'>
                        <HiOutlineDownload className='text-white w-6 h-6' />
                        <p className='font-normal font-primary leading-6 text-sm text-white '>Drop an image here</p>
                    </div>
                    <input
                        type='file'
                        id='files'
                        name='file'
                        className='absolute z-20 hidden w-full'
                        placeholder='Upload'
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </label>
            </div>
            <MovieDetailInputcard imgUrl={imgUrl} buttonText={buttonText} movie={movie} />
        </div>
    );
};

export default NewMovieCard;
