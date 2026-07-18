import {FC} from 'react';
import {cn} from "@/shared/lib";

import * as CartItem from "./cartItemDetails";
import {CartItemProps} from "@/shared/components/shared/cartItemDetails";
import {Trash2Icon} from "lucide-react";
import {CountButton} from "@/shared/components/shared/countButton";

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
  loading?: boolean
}

export const CartDrawerItem: FC<Props> = ({
  className,
  imageUrl,
  details,
  name,
  price,
  quantity,
  onClickCountButton,
  loading,
  onClickRemove
}) => {
  return (
    <div className={cn('flex bg-white p-5 gap-6', className)}>
      <CartItem.Image src={imageUrl}/>

      <div className='flex-1'>
        <CartItem.Info name={name} details={details}/>

        <hr className='my-3'/>

        <div className='flex items-center justify-between'>
          <CountButton onClick={onClickCountButton} value={quantity} loading={loading}/>

          <div className='flex items-center gap-3'>
            <CartItem.Price value={price}/>
            <Trash2Icon
              onClick={onClickRemove}
              className='text-gray-400 cursor-pointer hover:text-gray-600'
              size={16}
            />
          </div>

        </div>

      </div>

    </div>
  );
};