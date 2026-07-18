import {FC} from 'react';
import {CheckoutItemDetails, WhiteBlock, Button, Skeleton,} from "@/shared/components";
import {ArrowRight, Package, Percent, Truck} from "lucide-react";
import {cn} from "@/shared/lib";

interface Props {
  className?: string;
  totalAmount: number
  loading?: boolean
}

export const CheckoutSidebar: FC<Props> = ({className, totalAmount, loading}) => {
  const deliveryPrice = 120
  const NDS = Math.ceil(totalAmount * 0.05)
  const totalPrice = totalAmount + NDS + deliveryPrice

  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className='flex flex-col gap-1'>
        <span className='text-xl'>Итого:</span>
        {
          loading
            ? <Skeleton className='h-[51px] w-44'/>
            : <span className='text-[34px] font-extrabold'>{totalPrice} ₽</span>
        }
      </div>

      <CheckoutItemDetails
        title={
          <div className='flex items-center'>
            <Package size={18} className='mr-2 text-gray-400'/>
            Стоимость товаров:
          </div>
        }
        value={loading ? <Skeleton className='h-7 w-16 rounded-[10px]'/> : `${totalAmount} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className='flex items-center'>
            <Percent size={18} className='mr-2 text-gray-400'/>
            НДС:
          </div>
        }
        value={loading ? <Skeleton className='h-7 w-16 rounded-[10px]'/> : `${NDS} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className='flex items-center'>
            <Truck size={18} className='mr-2 text-gray-400'/>
            Доставка:
          </div>
        }
        value={loading ? <Skeleton className='h-7 w-16 rounded-[10px]'/> : `${deliveryPrice} ₽`}
      />

      <Button
        type='submit'
        className='w-full h-14 rounded-2xl mt-6 text-base font-bold'
        loading={loading}
      >
        Перейти к оплате
        <ArrowRight className='w-5 ml-2'/>
      </Button>

    </WhiteBlock>
  );
};