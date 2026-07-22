import {NextRequest, NextResponse} from "next/server";
import {PaymentCallbackData} from "@/@types/yookassa";
import {prisma} from "@/prisma/prisma-client";
import {OrderStatus} from "@prisma/client";
import {sendEmail} from "@/shared/lib";
import {CartItemDTO} from "@/shared/services/dto/cart.dto";
import {OrderCancelledTemplate, OrderSuccessTemplate} from "@/shared/components";


export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id)
      }
    })


    if (!order) {
      return NextResponse.json({error: "Order Not Found"});
    }

    const isSucceeded = body.object.status === 'succeeded';

    console.log(order.id, body.object.status);

    await prisma.order.update({
      where: {
        id: order.id
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    })

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        'Next Pizza | Ваш заказ успешно оформлен!',
        OrderSuccessTemplate({orderId: order.id, items})
      )
    } else {
      await sendEmail(
        order.email,
        'Next Pizza | Произошла ошибка!',
        OrderCancelledTemplate({orderId: order.id})
      )
    }

  } catch (error) {
    console.error('[Checkout Callback] Error', error);

    return NextResponse.json({
      error: 'Server error'
    });
  }
}

