'use client'

import {FC} from 'react';
import {cn} from "@/shared/lib";
import {Button} from "@/shared/components/ui";
import {ArrowRight, ShoppingCart} from 'lucide-react';
import {CartDrawer} from "@/shared/components/shared/cartDrawer";
import {useCartStore} from "@/shared/store";

interface Props {
  className?: string;
}

export const CartButton: FC<Props> = ({className}) => {
  const totalAmount = useCartStore(state => state.totalAmount)
  const totalQuantity = useCartStore(state => state.totalQuantity)
  const loading = useCartStore(state => state.loading)

  return (
    <CartDrawer>
      <Button loading={loading} className={cn('group relative px-2 text-xs sm:px-4 sm:text-sm', {'w-[132px]': loading}, className)}>
        <b>{totalAmount} ₽</b>
        <span className='mx-1 h-full w-[1px] bg-white/30 sm:mx-3'/>
        <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
          <ShoppingCart size={16} className='relative' strokeWidth={2}/>
          <b>{totalQuantity}</b>
        </div>
        <ArrowRight
          size={20}
          className='
            absolute right-2 transition
            duration-300 -translate-x-2 opacity-0 group-hover:opacity-100
            group-hover:translate-x-0 sm:right-5'
        />
      </Button>
    </CartDrawer>
  );
};