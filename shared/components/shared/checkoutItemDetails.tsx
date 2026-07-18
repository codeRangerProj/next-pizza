import {FC, ReactNode} from 'react';
import {cn} from "@/shared/lib";

interface Props {
  title?: ReactNode;
  value?: ReactNode;
  className?: string;
}

export const CheckoutItemDetails: FC<Props> = ({className, value, title}) => {
  return (
    <div className={cn('flex my-4', className)}>
      <span className='flex flex-1 text-lg text-neutral-500'>
        {title}
        <div className='flex-1 border-b border-dashed border-neutral-200 relative -top-1 mx-2'/>
      </span>

      <span className='font-bold text-lg'>{value}</span>
    </div>
  );
};