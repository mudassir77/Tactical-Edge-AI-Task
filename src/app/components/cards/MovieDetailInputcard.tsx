'use client'
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import { Controller } from 'react-hook-form';
import * as yup from 'yup';

import { useFormWithSchema } from '@/hooks';

import AppButton from '@/components/buttons/AppButton';

import TextInput from '../inputs/TextInput';

interface MovieDetailInputcardProps {
    buttonText?: string
    imgUrl: string | undefined;
    movie: any
}

interface IMovie {
    title: string;
    year: string;

}
const intialValues = {
    title: '',
    year: '',
}
const schema = yup.object().shape({
    title: yup.string().required("Title is required."),
    year: yup.string().required("Publishing Year is required."),
});

const MovieDetailInputcard = ({ buttonText, imgUrl, movie }: MovieDetailInputcardProps) => {
    const { handleSubmit, control, formState: { errors }, setValue } = useFormWithSchema(schema);
    const router = useRouter();
    const isEditMode = !!movie;

    React.useEffect(() => {
        if (isEditMode) {
            setValue('title', movie.name);
            setValue('year', movie.year.toString());
        }
    }, [isEditMode, movie, setValue]);

    const onSubmit = useCallback(async (data: IMovie) => {
        try {
            const formData = {
                ...data,
                img: imgUrl || movie?.img || '',
            };
            console.log('formData:', formData);

            const response = await fetch(isEditMode ? `/api/movies/${movie.id}` : '/api/movies', {
                method: isEditMode ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                next: { tags: ['movies'] }
            });

            if (!response.ok) {
                throw new Error(isEditMode ? 'Failed to update movie' : 'Failed to add movie');
            }

            const result = await response.json();
            console.log(isEditMode ? 'Updated movie:' : 'Added movie:', result);
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    }, [imgUrl, movie, isEditMode, router]);

    const handleCancel = () => {
        router.push('/');
    };

    return (
        <form className='flex flex-col gap-[64px]' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
                <Controller
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInput
                            placeholder='Title'
                            name={name}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            error={errors?.[name]?.message}
                            containerStyle='w-full'
                            style='w-full lg:w-[362px]'
                        />
                    )}
                    name='title'
                    control={control}
                    defaultValue={intialValues.title}
                />
                <Controller
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInput
                            placeholder='Publishing year'
                            name={name}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            error={errors?.[name]?.message}
                            containerStyle='w-full lg:w-[216px]'
                            style='w-full lg:w-[216px]'
                        />
                    )}
                    name='year'
                    control={control}
                    defaultValue={intialValues.year}
                />
            </div>
            <div className='flex gap-4'>
                <AppButton text='Cancel' style='bg-transparent border border-white hover:bg-white hover:text-backgroundGreen w-full' onClick={handleCancel} />
                <AppButton text={buttonText || (isEditMode ? 'Update' : 'Submit')} style='w-full' type='submit' />
            </div>
        </form>
    )
}


export default MovieDetailInputcard
