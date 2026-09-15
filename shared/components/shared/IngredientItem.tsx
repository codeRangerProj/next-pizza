import {FC} from 'react';
import {cn} from "@/shared/lib/utils";
import {CircleCheck} from "lucide-react";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
}

export const IngredientItem: FC<Props> = ({className, imageUrl, name, price, active, onClick}) => {
  return (
    <div
      className={cn(
        'relative flex w-full cursor-pointer flex-col items-center rounded-md bg-white p-2 text-center shadow-md sm:w-32 sm:p-3',
        {'border border-primary': active},
        className
      )}
      onClick={onClick}>
      {active && <CircleCheck className='absolute top-2 right-2 text-primary'/>}
      <img className='h-[84px] w-[84px] object-contain sm:h-[110px] sm:w-[110px]' src={imageUrl} alt={name} width={110} height={110}/>
      <span className='text-xs mb-3'>{name}</span>
      <span className='font-bold absolute bottom-0'>{price} ₽</span>
    </div>
  );
};