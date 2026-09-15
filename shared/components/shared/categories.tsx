'use client'

import {FC} from 'react';
import {cn} from "@/shared/lib/utils";
import {useCategoryStore} from "@/shared/store";
import {Category} from "@prisma/client";

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: FC<Props> = ({className, items}) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId)

  return (
    <div className={cn('inline-flex min-w-0 max-w-full gap-1 overflow-x-auto rounded-2xl bg-gray-50 p-1', className)}>
      {
        items.map(({name, id}, index) => (
          <a
            className={cn('flex h-9 shrink-0 items-center rounded-2xl px-3 text-sm font-bold sm:h-11 sm:px-5 sm:text-base',
              categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary',
            )}
            href={`/#${name}`}
            key={index}
          >
            <button>{name}</button>
          </a>
        ))
      }
    </div>
  );
};