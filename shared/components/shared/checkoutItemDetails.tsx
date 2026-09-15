import {FC, ReactNode} from 'react';
import {cn} from "@/shared/lib";

interface Props {
  title?: ReactNode;
  value?: ReactNode;
  className?: string;
}

export const CheckoutItemDetails: FC<Props> = ({className, value, title}) => {
  return (
    <div className={cn('my-3 flex sm:my-4', className)}>
      <span className='flex min-w-0 flex-1 text-base text-neutral-500 sm:text-lg'>
        {title}
        <div className='flex-1 border-b border-dashed border-neutral-200 relative -top-1 mx-2'/>
      </span>

      <span className='shrink-0 text-base font-bold sm:text-lg'>{value}</span>
    </div>
  );
};