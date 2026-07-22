import React, {FC} from 'react';

interface Props {
  orderId: number;
}

export const OrderCancelledTemplate: FC<Props> = ({orderId}) => {
  return (
    <div>
      <h1>Возникла какая-то ошибка!</h1>

      <p>При оплате заказа #{orderId} произошла ошибки, попробуйте еще раз.</p>
    </div>
  );
}