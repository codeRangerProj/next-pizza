"use client"

import {FC} from 'react';
import {Ingredient, ProductItem} from "@prisma/client";

import {cn} from "@/shared/lib/utils";
import {PizzaImage} from "@/shared/components/shared/pizzaImage";
import {Title} from "@/shared/components/shared/title";
import {Button} from "@/shared/components/ui";
import {GroupVariants} from "@/shared/components/shared/groupVariants";
import {PizzaSize, PizzaType, pizzaTypes} from "@/shared/constants/pizza";
import {IngredientItem} from "@/shared/components/shared/IngredientItem";
import {usePizzaOptions} from "@/shared/hooks";
import {getPizzaDetails} from "@/shared/lib";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  loading?: boolean;
  ingredients: Ingredient[];
  items: ProductItem[];
  onSubmit?: (itemId: number, ingredients: number[]) => void;
}

/**
 * Форма выбора пиццы
 */

export const ChoosePizzaForm: FC<Props> = ({className, name, loading, items, onSubmit, imageUrl, ingredients}) => {
  const {
    addIngredient,
    selectedIngredients,
    size,
    type,
    setSize,
    setType,
    availableSizes,
    currentItemId
  } = usePizzaOptions(items)

  const {totalPrice, textDetails} = getPizzaDetails(
    items,
    ingredients,
    type,
    size,
    selectedIngredients
  )

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit?.(currentItemId, Array.from(selectedIngredients))
    }
  }

  return (
    <div className={cn(className, 'flex flex-1 flex-col sm:flex-row')}>
      <PizzaImage imageUrl={imageUrl} size={size}/>

      <div className='w-full bg-[#f7f6f5] p-5 sm:w-[490px] sm:p-7'>
        <Title text={name} size='md' className='mb-1 text-[24px] font-extrabold sm:text-[26px]'/>

        <p className='text-gray-400'>{textDetails}</p>

        <div className='flex flex-col gap-2 mt-5'>
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={value => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={value => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className='scrollbar mt-5 h-[300px] overflow-auto rounded-md bg-gray-50 p-3 sm:h-[420px] sm:p-5'>
          <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3'>
            {
              ingredients.map((ingredient) => (
                <IngredientItem
                  key={ingredient.id}
                  imageUrl={ingredient.imageUrl}
                  name={ingredient.name}
                  price={ingredient.price}
                  active={selectedIngredients.has(ingredient.id)}
                  onClick={() => addIngredient(ingredient.id)}
                />
              ))
            }
          </div>
        </div>
        <Button
          loading={loading}
          onClick={handleClickAdd}
          className='mt-6 h-[55px] w-full rounded-[18px] px-6 text-base sm:mt-10 sm:px-10'
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>

    </div>
  );
};