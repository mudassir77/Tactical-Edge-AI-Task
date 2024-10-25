'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';

export default function useFormWithSchema<T extends Yup.AnyObjectSchema>(
  schema: T,
  useFormProps?: UseFormProps<Yup.Asserts<T>>
): UseFormReturn<Yup.Asserts<T>> {
  return useForm({ ...useFormProps, resolver: yupResolver(schema) });
}
