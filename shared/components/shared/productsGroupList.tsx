'use client'

import {useIntersection} from 'react-use';
import {FC, useEffect, useRef} from 'react';
import {Title} from './title';
import {ProductCard} from "@/shared/components/shared/productCard";
import {cn} from "@/shared/lib/utils";
import {useCategoryStore} from "@/shared/store";
import {ProductWithRelations} from "@/@types/prisma";

interface Props {
  title: string;
  items: ProductWithRelations[]
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: FC<Props> = ({title, listClassName, items, categoryId, className}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.7,
  })

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId)
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryId, title]);

  return (
    <div className={cn(className, 'scroll-mt-[100px]')} id={title} ref={intersectionRef}>
      <Title text={title} className='font-extrabold mb-5' size='lg'/>

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((item, i) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.items[0]?.price}
            imageUrl={item.imageUrl}
            ingredients={item.ingredients}
          />
        ))}
      </div>
    </div>
  );
};