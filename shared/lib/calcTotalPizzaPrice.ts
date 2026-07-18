import {Ingredient, ProductItem} from "@prisma/client";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";

/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @example calcTotalPizzaPrice(1, 20, items, ingredients, selectedIngredients)
 *
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param selectedIngredients - выбранные ингредиенты
 *
 * @returns number общую стоимость
 */

export const calcTotalPizzaPrice = (
  items: ProductItem[],
  ingredients: Ingredient[],
  type: PizzaType,
  size: PizzaSize,
  selectedIngredients: Set<number>
) => {
  const pizzaPrice = items.find(
    (item) => item.pizzaType === type && item.size === size
  )?.price || 0

  const totalIngredientsPrice = ingredients.filter(
    (ingredient) => selectedIngredients.has(ingredient.id)).reduce(
    (acc, ingredient) => acc + ingredient.price, 0)

  return pizzaPrice + totalIngredientsPrice
}