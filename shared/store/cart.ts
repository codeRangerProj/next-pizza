import {create} from "zustand/react";
import {Api} from "@/shared/services/api-client";
import {getCartDetails} from "@/shared/lib";
import {CartStateItem} from "@/shared/lib/getCartDetails";
import {CreateCartItemValues} from "@/shared/services/dto/cart.dto";


export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  totalQuantity: number;
  items: CartStateItem[];

  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  removeAllCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,
  totalQuantity: 0,

  fetchCartItems: async () => {
    try {
      set({loading: true, error: false})
      const data = await Api.cart.getCart()
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({error: true})
    } finally {
      set({loading: false})
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set(state => ({
        loading: true,
        error: false,
        items: state.items.map((item) => (item.id === id ? {...item, loading: true} : item))
      }))
      const data = await Api.cart.updateItemQuantity(id, quantity)
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({error: true})
    } finally {
      set({loading: false})
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set(state => ({
        loading: true,
        error: false,
        items: state.items.map((item) => (item.id === id ? {...item, loading: true} : item))
      }))
      const data = await Api.cart.removeCartItem(id)
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({error: true})
    } finally {
      set({loading: false})
    }
  },

  removeAllCart: async () => {
    try {
      set({loading: true, error: false})
      const data = await Api.cart.removeAllCart()
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({error: true})
    } finally {
      set({loading: false})
    }
  },


  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({loading: true, error: false})
      const data = await Api.cart.addCartItem(values)
      set(getCartDetails(data));
    } catch (error) {
      console.error(error)
      set({error: true})
    } finally {
      set({loading: false})
    }
  },

}))

