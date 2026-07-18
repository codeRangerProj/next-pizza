'use server'

import {TCheckoutFormValues} from "@/shared/constants";
import {cookies} from "next/headers";
import {prisma} from "@/prisma/prisma-client";
import {OrderStatus} from "@prisma/client";

export async function createOrder(data: TCheckoutFormValues) {
  try {
    const cookieStore = cookies()
    const cartToken = cookieStore.get('cartToken')?.value

    if (!cartToken) {
      throw new Error("Could not find cartToken from store");
    }

    /**
     * Находим корзину по токену*/
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken
      },
    })

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    /**
     * Создаем заказ
     */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    /**
     * Очищаем корзину
     */
    await prisma.cart.update({
      where: {
        id: userCart.id
      },
      data: {
        totalAmount: 0
      }
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      }
    })

  } catch (error) {

  }
}