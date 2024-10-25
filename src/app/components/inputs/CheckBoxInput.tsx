import React, { useCallback } from 'react';

import { cn } from '@/lib/utils';

interface CheckBoxInputProps {
    name?: string;
    label: string;
    onChange?: (isChecked: boolean) => void;
    styles?: string;
    checked?: boolean;
    type?: 'checkbox' | 'radio';
}

const CheckBoxInput = ({ name, label, onChange, styles, checked = false, type = 'checkbox' }: CheckBoxInputProps) => {

    const handleChange = useCallback(() => {
        if (onChange) {
            onChange(!checked);
        }
    }, [checked, onChange]);

    return (
        <div onClick={type === 'radio' ? () => undefined : handleChange} className={cn('flex gap-[15px] items-center', styles)}>
            <input
                type={type}
                name={name}
                id={name}
                className={cn(
                    'bg-inputGreen border-none cursor-pointer',
                    type === 'checkbox' ? 'rounded-[2px]' : 'rounded-full',
                )}
                color='#224957'
                checked={checked}
                onChange={type === 'radio' ? handleChange : () => undefined}
            />
            <label htmlFor={name} className='font-normal font-primary text-white leading-base text-sm text-wrap'>{label}</label>
        </div>
    );
};

export default React.memo(CheckBoxInput);
