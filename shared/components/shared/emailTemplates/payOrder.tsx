import React from 'react';

interface EmailTemplateProps {
  orderId: number;
  totalAmount: number;
}

export function EmailTemplate({orderId, totalAmount}: EmailTemplateProps) {
  return (
    <div>
      <h1>Заказ #{orderId}</h1>

      <p>Оплатите заказ на сумму {totalAmount}</p>
    </div>
  );
}