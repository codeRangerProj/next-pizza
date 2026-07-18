import {useEffect, useState} from "react";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";
import {Variant} from "@/shared/components/shared/groupVariants";
import {useSet} from "react-use";
import {getAvailablePizzaSizes} from "@/shared/lib";
import {ProductItem} from "@prisma/client";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  selectedIngredients: Set<number>
  addIngredient: (id: number) => void;
  availableSizes: Variant[];
  currentItemId?: number;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)
  const availableSizes = getAvailablePizzaSizes(items, type)

  const currentItemId = items.find((item) => item.pizzaType === type && item.size == size)?.id

  const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]))


  useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    )
    const availableSize = availableSizes?.find(
      (item) => !item.disabled
    )

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize)
    }
  }, [type]);

  return {
    addIngredient,
    selectedIngredients,
    size,
    type,
    setSize,
    setType,
    availableSizes,
    currentItemId
  }
}