import {cn} from '@/shared/lib/utils';
import React, {FC} from 'react';
import {CountIconButton} from "@/shared/components/shared";
import {LoaderCircle} from "lucide-react";

export interface CountButtonProps {
  value?: number;
  size?: 'sm' | 'lg';
  onClick?: (type: 'plus' | 'minus') => void;
  className?: string;
  loading?: boolean;
}

export const CountButton: FC<CountButtonProps> = ({
  className,
  onClick,
  value = 1,
  size = 'sm',
  loading = false,
}) => {
  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <CountIconButton
        onClick={() => onClick?.('minus')}
        disabled={loading || value === 1}
        size={size}
        type="minus"
      />

      <div className='flex w-4 justify-center'>
        {loading
          ? <LoaderCircle className='size-5 animate-spin text-primary'/>
          : <b className={cn(size === 'sm' ? 'text-sm' : 'text-md', className)}>
            {value}
          </b>
        }
      </div>

      <CountIconButton
        onClick={() => onClick?.('plus')}
        size={size}
        type="plus"
        disabled={loading}
      />
    </div>
  );
};