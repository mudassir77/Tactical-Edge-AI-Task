import React from 'react';

import { cn } from '@/lib/utils';

interface TextInputProps {
  type?: string;
  placeholder?: string;
  isTextArea?: boolean;
  disabled?: boolean;
  name: string;
  error?: string;
  value?: string | number;
  onChange?: (
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onBlur?:
  | React.FocusEventHandler<HTMLInputElement>
  | React.FocusEventHandler<HTMLTextAreaElement>;
  readOnly?: boolean;
  style?: string;
  label?: string;
  subLabel?: string;
  containerStyle?: string;
  labelstyle?: string;
  rows?: number;
  requiresCheckbox?: boolean;
}

const customInputStyle =
  'text-white bg-inputGreen min-w-[100%]  placeholder:text-white text-base   p-2.5  pl-4  rounded-md  form-field font-primary border-none';

const TextInput = ({
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  readOnly = false,
  placeholder,
  error,
  disabled,
  style,
  label,
  containerStyle,
  labelstyle,
  isTextArea,
  rows = 2,
  subLabel,
}: TextInputProps) => {
  return (
    <div className={cn('relative', containerStyle)}>
      <div className='flex flex-col gap-1 '>
        <div className='flex flex-col gap-[2px]'>
          <label
            className={cn(
              'font-normal text-[14px] leading-[19.6px] text-white font-primary',
              labelstyle
            )}
          >
            {label}
          </label>
        </div>

        {!isTextArea ? (
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value ?? ''}
            onChange={onChange}
            readOnly={readOnly}
            onBlur={onBlur as React.FocusEventHandler<HTMLInputElement>}
            className={cn(customInputStyle, style)}
            disabled={disabled}
          />
        ) : (
          <textarea
            placeholder={placeholder}
            rows={rows}
            className={cn('resize-none  ', customInputStyle, style)}
            name={name}
            value={value}
            onBlur={onBlur as React.FocusEventHandler<HTMLTextAreaElement>}
            onChange={onChange}
            readOnly={readOnly}
          />
        )}
      </div>

      {!!error && (
        <p className='text-white text-[10px] mt-[3px] absolute top-11 -bottom-[12px] left-[2px]'>
          {error}
        </p>
      )}
    </div>
  );
};

export default React.memo(TextInput);
