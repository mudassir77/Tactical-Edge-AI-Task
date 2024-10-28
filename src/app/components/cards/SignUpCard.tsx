'use client'
import { signIn } from 'next-auth/react';
import React, { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import * as yup from 'yup';

import { fetchWithToast } from '@/lib/fetchWithToast';
import { useFormWithSchema } from '@/hooks';

import AppButton from '@/components/buttons/AppButton';

import CheckBoxInput from '../inputs/CheckBoxInput';
import TextInput from '../inputs/TextInput';

interface SignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required.'),
  lastName: yup.string().required('Last name is required.'),
  email: yup.string().email('Invalid email').required('Email is required.'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required.'),
});

const SignUpCard = () => {
  const { handleSubmit, control, formState: { errors } } = useFormWithSchema(schema);
  const [isAccept, setIsAccept] = useState<boolean>(false);


  const onSubmit = useCallback(async ({ firstName, lastName, email, password }: SignUp) => {
    try {
      const response = await fetchWithToast('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
        errorMessage: 'Failed to sign up',
      });

      await signIn('credentials', {
        redirect: true,
        email,
        password,
        callbackUrl: '/',
      });
    } catch (error: any) {
      console.error('Sign-up error:', error);
    }
  }, []);


  return (
    <form className='flex flex-col gap-10 w-[300px]' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-6'>
        <Controller
          render={({
            field: { onChange, onBlur, value, name },
          }) => {
            return (
              <TextInput
                placeholder='First Name'
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors?.[name]?.message}
                containerStyle='w-full'
              />
            );
          }}
          name='firstName'
          control={control}
          defaultValue={initialValues.firstName}
        />
        <Controller
          render={({
            field: { onChange, onBlur, value, name },
          }) => {
            return (
              <TextInput
                placeholder='Last Name'
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors?.[name]?.message}
                containerStyle='w-full'
              />
            );
          }}
          name='lastName'
          control={control}
          defaultValue={initialValues.lastName}
        />
        <Controller
          render={({
            field: { onChange, onBlur, value, name },
          }) => {
            return (
              <TextInput
                placeholder='Email'
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors?.[name]?.message}
                containerStyle='w-full'
              />
            );
          }}
          name='email'
          control={control}
          defaultValue={initialValues.email}
        />
        <Controller
          render={({
            field: { onChange, onBlur, value, name },
          }) => {
            return (
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
            );
          }}
          name='password'
          control={control}
          defaultValue={initialValues.password}
        />
        <div className='flex w-full h-full justify-center items-center'>
          <CheckBoxInput label='Accept terms and conditions' styles='min-w-max' checked={isAccept} onChange={() => setIsAccept(prev => !prev)} />
        </div>
        <AppButton text='Sign Up' />
      </div>
    </form>
  );
};

export default SignUpCard;
