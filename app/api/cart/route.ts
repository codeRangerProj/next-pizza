import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";
import {findOrCreateCart} from "@/shared/lib/findOrCreateCart";
import {CreateCartItemValues} from "@/shared/services/dto/cart.dto";
import {updateCartTotalAmount} from "@/shared/lib";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({totalAmount: 0, items: []})
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            productItem: {
              include: {
                product: true
              }
            },
            ingredients: true
          }
        }
      }
    })

    return NextResponse.json(userCart);
  } catch (error) {
    console.error('[CART_GET] Server error', error);
    return NextResponse.json({message: 'Не удалось получить корзину'}, {status: 500})
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value

    if (!token) {
      token = crypto.randomUUID()
    }

    const userCart = await findOrCreateCart(token)


    const data = (await req.json()) as CreateCartItemValues

    const newIngredients = [...data.ingredients || []].sort((a, b) => a - b);

    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
      include: {
        ingredients: true
      }
    })

    const findCartItem = cartItems.find((item) => {
      const currentIngredients = item.ingredients
        .map((ingredient) => ingredient.id)
        .sort((a, b) => a - b);

      return (
        currentIngredients.length === newIngredients.length &&
        currentIngredients.every((id, index) => id === newIngredients[index])
      );
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        }
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: {connect: data.ingredients?.map((id) => ({id}))}
        }
      })
    }


    const updatedUserCart = await updateCartTotalAmount(token)

    const resp = NextResponse.json(updatedUserCart)
    resp.cookies.set('cartToken', token)
    return resp

  } catch (error) {
    console.error('[CART_POST] Server error', error);
    return NextResponse.json({message: 'Не удалось создать корзину'}, {status: 500})
  }

}

export async function DELETE(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({error: 'Cart token not found'});
    }

    await prisma.cartItem.deleteMany()

    const updatedUserCart = await updateCartTotalAmount(token)

    return NextResponse.json(updatedUserCart)

  } catch (error) {
    console.error('[CART_DELETE_ALL] Server error', error);
    return NextResponse.json({message: 'Не удалось удалить корзину'}, {status: 500})
  }
}