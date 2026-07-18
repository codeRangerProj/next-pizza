'use client'

import {FC} from 'react';
import {useCartStore} from "@/shared/store";
import toast from "react-hot-toast";
import {ProductWithRelations} from "@/@types/prisma";
import {ChoosePizzaForm} from "@/shared/components/shared/choosePizzaForm";
import {ChooseProductForm} from "@/shared/components/shared/chooseProductForm";

interface Props {
  product: ProductWithRelations
  onSubmit?: VoidFunction
}

export const ProductForm: FC<Props> = ({onSubmit: _onSubmit, product}) => {
  const addCartItem = useCartStore(state => state.addCartItem)
  const loading = useCartStore(state => state.loading)

  const firstItem = product.items[0]
  const isPizzaForm = Boolean(firstItem.pizzaType)

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id

      await addCartItem({
        productItemId: itemId,
        ingredients
      })
      toast.success('Продукт добавлен в корзину')

      _onSubmit?.()
    } catch (error) {
      toast.error('Не удалось добавить продукт в корзину')
      console.error(error)
    }
  }

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        loading={loading}
        onSubmit={onSubmit}
      />
    )
  } else {
    return (
      <ChooseProductForm
        imageUrl={product.imageUrl}
        name={product.name}
        price={firstItem.price}
        loading={loading}
        onSubmit={onSubmit}
      />
    )
  }
};