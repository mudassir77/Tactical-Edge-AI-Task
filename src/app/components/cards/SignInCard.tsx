'use client'
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import React, { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import * as yup from 'yup';

import { useFormWithSchema } from '@/hooks';
import AppButton from '@/components/buttons/AppButton';
import CheckBoxInput from '../inputs/CheckBoxInput';
import TextInput from '../inputs/TextInput';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface SignIn {
    email: string;
    password: string;
}
const intialValues = {
    email: '',
    password: '',
};
const schema = yup.object().shape({
    email: yup.string().required("Email is required."),
    password: yup.string().required("Password is required."),
});

const SignInCard = () => {
    const { handleSubmit, control, formState: { errors } } = useFormWithSchema(schema);
    const [isAccept, setIsAccept] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = useCallback(async ({ email, password }: SignIn) => {
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: '/'
        });

        if (result?.ok) {
            toast.success('Login successful');
            router.push('/');
        }

        if (result?.error) {
            toast.error(result.error);
        } else {
            console.log('Login successful', result);
        }
    }, []);
    return (
        <form className='flex flex-col gap-10 w-[300px]' onSubmit={handleSubmit(onSubmit)} >
            <div className='flex flex-col gap-6'>
                <Controller
                    render={({
                        field: { onChange, onBlur, value, name },
                    }) => (
                        <TextInput
                            placeholder='Email'
                            name={name}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            error={errors?.[name]?.message}
                            containerStyle='w-full'
                        />
                    )}
                    name='email'
                    control={control}
                    defaultValue={intialValues.email}
                />
                <Controller
                    render={({
                        field: { onChange, onBlur, value, name },
                    }) => (
                        <TextInput
                            placeholder='Password'
                            name={name}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            error={errors?.[name]?.message}
                            containerStyle='w-full'
                            type='password'
                        />
                    )}
                    name='password'
                    control={control}
                    defaultValue={intialValues.password}
                />
                <div className='flex w-full h-full justify-center items-center'>
                    <CheckBoxInput label='Remember me' styles='min-w-max' checked={isAccept} onChange={() => setIsAccept(prev => !prev)} />
                </div>
                <AppButton text='Login' />
                <div>
                    <span className='text-white'>Don't have an account? </span>
                    <Link href='/signup' className='text-buttonGreen'>Sign up</Link>
                </div>
            </div>
        </form>
    )
}

export default SignInCard;
