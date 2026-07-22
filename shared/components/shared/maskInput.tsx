'use client'

import {forwardRef, InputHTMLAttributes} from 'react';
import {IMaskInput} from 'react-imask';

import {cn} from '@/shared/lib/utils';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  placeholder?: string;
}

export const MaskInput = forwardRef<HTMLInputElement, Props>(
  ({value, onChange, onBlur, className, placeholder}, ref) => {
    return (
      <IMaskInput
        mask="+7 (000) 000-00-00"
        value={value}
        inputRef={ref}
        onBlur={onBlur}
        onAccept={(value) => onChange(String(value))}
        placeholder={placeholder}
        className={cn(
          'flex h-12 w-full rounded-md border border-input bg-white px-3 py-2 text-md ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className,
        )}
      />
    );
  },
);

MaskInput.displayName = 'MaskInput';