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
        'flex items-center flex-col p-3 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
        {'border border-primary': active},
        className
      )}
      onClick={onClick}>
      {active && <CircleCheck className='absolute top-2 right-2 text-primary'/>}
      <img src={imageUrl} alt={name} width={110} height={110}/>
      <span className='text-xs mb-3'>{name}</span>
      <span className='font-bold absolute bottom-0'>{price} ₽</span>
    </div>
  );
};