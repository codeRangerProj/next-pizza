import {useEffect} from "react";
import {useCartStore} from "../store";
import {CreateCartItemValues} from "@/shared/services/dto/cart.dto";
import {CartStateItem} from "@/shared/lib/getCartDetails";

type ReturnProps = {
  totalAmount: number
  totalQuantity: number
  items: CartStateItem[]
  loading: boolean
  addCartItem: (values: CreateCartItemValues) => void;
  updateItemQuantity: (id: number, quantity: number) => void
  removeCartItem: (id: number) => void
  removeAllCart: () => void;
}

export const useCart = (): ReturnProps => {
  const cartState = useCartStore(state => state);

  useEffect(() => {
    void cartState.fetchCartItems()
  }, []);

  return cartState
}