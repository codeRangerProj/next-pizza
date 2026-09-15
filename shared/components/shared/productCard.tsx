import {FC} from 'react';
import Link from "next/link";
import {Title} from './title';
import {Button} from '../ui';
import {Plus} from "lucide-react";
import {Ingredient} from "@prisma/client";
import {cn} from "@/shared/lib/utils";
import {productDescriptions} from "@/shared/lib/productDescriptions";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
  ingredients: Ingredient[];
}

export const ProductCard: FC<Props> = ({id, name, price, ingredients, imageUrl, className}) => {
  const description = ingredients.length > 0
    ? ingredients.map((ingredient) => ingredient.name).join(', ')
    : productDescriptions[name] || ''

  return (
    <div className={cn('h-full', className)}>
      <Link
        href={`/product/${id}`}
        scroll={false}
        className='flex h-full flex-col'
      >

        <div className='flex h-[150px] items-center justify-center rounded-lg bg-secondary p-3 sm:h-[220px] sm:p-5 lg:h-[260px] lg:p-6'>
          <img
            className='h-full w-full object-contain'
            src={imageUrl}
            alt={name}
          />
        </div>

        <Title
          text={name}
          size='sm'
          className='mt-3 mb-3 h-[48px] text-lg font-bold sm:h-[66px] sm:text-[22px]'
        />

        <p className='h-10 text-sm text-gray-400 line-clamp-2'>
          {description}
        </p>

        <div className='mt-auto flex flex-col items-start justify-between gap-2 pt-3 sm:flex-row sm:items-center sm:pt-4'>
          <span className='text-base sm:text-[20px]'>
            от <b>{price} ₽</b>
          </span>

          <Button variant='secondary' className='w-full text-sm font-bold sm:w-auto sm:text-base'>
            <Plus size={18} className='mr-1 sm:h-5 sm:w-5'/>
            <span className='sm:inline'>Добавить</span>
          </Button>

        </div>

      </Link>
    </div>
  );
};