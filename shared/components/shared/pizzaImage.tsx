import {FC} from 'react';
import {cn} from "@/shared/lib/utils";

interface Props {
  className?: string;
  imageUrl: string;
  size: 20 | 30 | 40
}

export const PizzaImage: FC<Props> = ({className, imageUrl, size}) => {
  return (
    <div className={cn('relative flex min-h-[280px] w-full flex-1 items-center justify-center sm:min-h-0', className)}>
      <img
        src={imageUrl}
        alt="Logo"
        className={cn('relative left-2 top-2 transition-all z-10 duration-300', {
          'h-[220px] w-[220px]': size === 20,
          'h-[270px] w-[270px]': size === 30,
          'h-[320px] w-[320px]': size === 40,
          'sm:h-[300px] sm:w-[300px]': size === 20,
          'sm:h-[400px] sm:w-[400px]': size === 30,
          'sm:h-[500px] sm:w-[500px]': size === 40,
        })}
      />

      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
      border-dashed border-2 rounded-full border-gray-200 w-[290px] h-[290px] sm:w-[450px] sm:h-[450px]'
      />
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
      border-dotted border-2 rounded-full border-gray-100 w-[240px] h-[240px] sm:w-[370px] sm:h-[370px]'
      />

    </div>
  );
};