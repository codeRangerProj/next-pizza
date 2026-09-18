import {NextRequest, NextResponse} from "next/server";
import {PaymentCallbackData} from "@/@types/yookassa";
import {prisma} from "@/prisma/prisma-client";
import {OrderStatus} from "@prisma/client";
import {sendEmail} from "@/shared/lib";
import {CartItemDTO} from "@/shared/services/dto/cart.dto";
import {OrderCancelledTemplate, OrderSuccessTemplate} from "@/shared/components";


export async function POST(req: NextRequest) {
  console.log('🔥 YOOKASSA CALLBACK');
  try {
    const body = (await req.json()) as PaymentCallbackData;

    console.log('[Checkout Callback] YooKassa status:', body.object.status);
    console.log('[Checkout Callback] order_id:', body.object.metadata.order_id);

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      console.log('[Checkout Callback] Order not found');

      return NextResponse.json(
        { error: 'Order Not Found' },
        { status: 404 },
      );
    }

    const isSucceeded = body.object.status === 'succeeded';

    console.log('[Checkout Callback] Order:', order.id);
    console.log('[Checkout Callback] Status:', body.object.status);
    console.log('[Checkout Callback] Items from DB:', order.items);

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded
          ? OrderStatus.SUCCEEDED
          : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order.items as string) as CartItemDTO[];

    console.log('[Checkout Callback] Parsed items:', items);
    console.log('[Checkout Callback] Items count:', items.length);

    if (isSucceeded) {
      console.log('[Checkout Callback] Sending success email...');

      const result = await sendEmail(
        order.email,
        'Next Pizza | Ваш заказ успешно оформлен!',
        OrderSuccessTemplate({
          orderId: order.id,
          items,
        }),
      );

      console.log('[Checkout Callback] Success email result:', result);
    } else {
      console.log('[Checkout Callback] Sending cancelled email...');

      const result = await sendEmail(
        order.email,
        'Next Pizza | Произошла ошибка!',
        OrderCancelledTemplate({
          orderId: order.id,
        }),
      );

      console.log('[Checkout Callback] Cancelled email result:', result);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Checkout Callback] Error:', error);

    return NextResponse.json(
      {
        error: 'Server error',
      },
      { status: 500 },
    );
  }
}

