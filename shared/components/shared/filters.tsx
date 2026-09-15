'use client'

import {FC, useState} from 'react';
import {Title} from "./title";
import {Input} from "@/shared/components/ui";
import {RangeSlider} from "@/shared/components/shared/rangeSlider";
import {CheckboxFiltersGroup} from "@/shared/components/shared";
import {useFilters, useIngredients, useQueryFilters} from '@/shared/hooks';

interface Props {
  className?: string;
}

export const Filters: FC<Props> = ({className}) => {
  const [isOpen, setIsOpen] = useState(false)
  const {ingredients, loading} = useIngredients()
  const filters = useFilters()

  useQueryFilters(filters)

  const items = ingredients.map((item) => (
    {value: String(item.id), text: item.name})
  )

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0])
    filters.setPrices('priceTo', prices[1])
  }

  return (
    <div className={className}>
      <div className='flex items-center justify-between lg:block'>
        <Title text='Фильтрация' size='sm' className='mb-4 text-xl font-bold sm:mb-5 sm:text-[22px]'/>
        <button
          type='button'
          className='mb-4 text-sm font-bold text-primary lg:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Скрыть' : 'Показать'}
        </button>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden lg:block'} border-b border-neutral-100 pb-6`}>
        <CheckboxFiltersGroup
          title='Тип теста'
          className='mb-5'
          name='pizzaTypes'
          onCLickCheckbox={filters.setPizzaTypes}
          selectedValues={filters.pizzaTypes}
          items={[
            {text: 'Тонкое', value: '1'},
            {text: 'Традиционное', value: '2'},
          ]}
        />

        <CheckboxFiltersGroup
          title='Размеры'
          className='mb-5'
          name='sizes'
          onCLickCheckbox={filters.setSizes}
          selectedValues={filters.sizes}
          items={[
            {text: '20 см', value: '20'},
            {text: '30 см', value: '30'},
            {text: '40 см', value: '40'},
          ]}
        />

        <div className='mt-5 border-y border-b-neutral-100 px-1 py-6 pb-7 sm:px-0'>
          <p className='mb-3 font-bold'>Цена от и до:</p>
          <div className='mb-5 flex min-w-0 gap-2 sm:gap-3'>
            <Input
              type='number'
              placeholder='0'
              min={0}
              max={1000}
              value={String(filters.prices.priceFrom ?? '')}
              onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
              className='w-0 min-w-0 flex-1 px-2 sm:px-3'
            />
            <Input
              type='number'
              placeholder='1000'
              min={100}
              max={1000}
              value={String(filters.prices.priceTo ?? '')}
              onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
              className='w-0 min-w-0 flex-1 px-2 sm:px-3'
            />
          </div>

          <RangeSlider
            min={0}
            max={1000}
            step={10}
            value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
            onValueChange={updatePrices}
          />
        </div>

        <CheckboxFiltersGroup
          title='Ингредиенты'
          className='mt-5'
          name='ingredients'
          limit={6}
          defaultItems={items.slice(0, 6)}
          items={items}
          loading={loading}
          onCLickCheckbox={filters.setSelectedIngredients}
          selectedValues={filters.selectedIngredients}
        />
      </div>

    </div>
  );
};