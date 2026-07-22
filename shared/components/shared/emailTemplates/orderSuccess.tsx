import React, {FC} from 'react';
import {CartItemDTO} from "@/shared/services/dto/cart.dto";

interface Props {
  orderId: number;
  items: CartItemDTO[]
}

export const OrderSuccessTemplate: FC<Props> = ({orderId, items}) => {
  return (
    <div>
      <h1>Спасибо за покупку!</h1>

      <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>

      <hr/>

      <ul>
        {items.map((item: CartItemDTO) => (
          <li key={item.id}>
            {item.productItem.product.name} | {item.productItem.price} ₽ x {item.quantity} шт. ={' '}
            {item.productItem.price * item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}