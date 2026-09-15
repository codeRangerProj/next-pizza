import {FC} from 'react';
import {cn} from "@/shared/lib/utils";
import {Title} from "@/shared/components/shared/title";
import {Button} from "@/shared/components/ui";
import {productDescriptions} from "@/shared/lib/productDescriptions";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  loading?: boolean;
  price: number;
  onSubmit?: VoidFunction;
}

/**
 * Форма выбора продукта
 */

export const ChooseProductForm: FC<Props> = ({className, name, loading, price, onSubmit, imageUrl}) => {

  return (
    <div className={cn(className, 'flex flex-1 flex-col sm:flex-row')}>
      <div className='relative flex min-h-[260px] w-full flex-1 items-center justify-center sm:min-h-0'>
        <img
          src={imageUrl}
          alt={name}
          className='relative z-10 h-[220px] w-[220px] transition-all duration-300 sm:left-2 sm:top-2 sm:h-[350px] sm:w-[350px]'
        />
      </div>

      <div className='w-full bg-[#f7f6f5] p-5 sm:w-[490px] sm:p-7'>
        <Title text={name} size='md' className='mb-1 text-[24px] font-extrabold sm:text-[26px]'/>

        <p className='text-gray-400'>{productDescriptions[name] || ''}</p>

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className='mt-6 h-[55px] w-full rounded-[18px] px-6 text-base sm:mt-10 sm:px-10'
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>

    </div>
  );
};