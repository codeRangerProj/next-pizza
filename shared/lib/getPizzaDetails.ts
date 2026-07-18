import {calcTotalPizzaPrice} from "@/shared/lib/calcTotalPizzaPrice";
import {mapPizzaType, PizzaSize, PizzaType} from "@/shared/constants/pizza";
import {Ingredient, ProductItem} from "@prisma/client";

export const getPizzaDetails = (
  items: ProductItem[],
  ingredients: Ingredient[],
  type: PizzaType,
  size: PizzaSize,
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    items,
    ingredients,
    type,
    size,
    selectedIngredients
  )

  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`

  return {totalPrice, textDetails}
}