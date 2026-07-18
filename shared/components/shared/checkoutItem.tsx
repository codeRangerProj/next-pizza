'use client';

import React from 'react';
import {cn} from '@/shared/lib/utils';
import {X} from 'lucide-react';
import * as CartItemDetails from './cartItemDetails';
import {CartItemProps} from "./cartItemDetails";
import {Skeleton} from "@/shared/components";

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
  loading?: boolean;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  loading = false,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        {
          'opacity-50 pointer-events-none': loading,
        },
        className,
      )}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl}/>
        <CartItemDetails.Info name={name} details={details}/>
      </div>

      <CartItemDetails.Price value={price}/>

      <div className="flex items-center gap-5 ml-20">
        <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} loading={loading}/>
        <button type="button" onClick={onClickRemove}>
          <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20}/>
        </button>
      </div>
    </div>
  );
};
