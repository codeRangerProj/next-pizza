import {FC} from 'react';
import {FormInputAddress, FormTextarea, WhiteBlock} from "@/shared/components/shared";

interface Props {
  className?: string;
}

export const CheckoutDeliveryForm: FC<Props> = ({className}) => {

  return (
    <WhiteBlock title='3. Адрес доставки' className={className}>
      <div className='flex flex-col gap-5'>
        <FormInputAddress
          name='address'
          className='text-base'
          placeholder='Введите адрес'
        />
        <FormTextarea
          name='comment'
          rows={5}
          className='text-base'
          placeholder='Комментарий к заказу'
        />
      </div>
    </WhiteBlock>
  );
};