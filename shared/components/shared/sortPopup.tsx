import {FC} from 'react';
import {cn} from "@/shared/lib/utils";
import {ArrowUpDown} from "lucide-react";

interface Props {
  className?: string;
}

export const SortPopup: FC<Props> = ({className}) => {
  return (
    <div
      className={cn('inline-flex h-10 items-center gap-1 rounded-2xl bg-gray-50 px-2 text-xs sm:h-[52px] sm:px-5 sm:text-base', className)}>
      <ArrowUpDown size={14} className='sm:h-4 sm:w-4'/>
      <b className='hidden sm:inline'>Сортировка:</b>
      <b className='text-primary'>популярное</b>
    </div>
  );
};