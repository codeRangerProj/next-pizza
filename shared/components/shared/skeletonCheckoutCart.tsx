import React, {FC} from 'react';
import {Skeleton} from "@/shared/components";

interface Props {
  className?: string;
}

export const SkeletonCheckoutCart: FC<Props> = ({className}) => {
  return (
    <div className='flex items-center justify-between'>
      <div className="flex items-center gap-5 flex-1">
        <Skeleton className='w-[60px] h-[60px] rounded-full'/>
        <Skeleton className='h-[50px] w-[366px]'/>
      </div>

      <Skeleton className='h-6 w-11'/>

      <div className="flex items-center gap-5 ml-20">
        <Skeleton className='h-[30px] w-[100px]'/>
        <Skeleton className='h-5 w-5'/>
      </div>
    </div>
  );
};