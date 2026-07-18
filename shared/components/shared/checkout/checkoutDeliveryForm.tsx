import {FC} from 'react';
import {Input} from "@/shared/components/ui";
import {AddressInput, ErrorText, FormTextarea, WhiteBlock} from "@/shared/components/shared";
import {Controller, useFormContext} from "react-hook-form";

interface Props {
  className?: string;
}

export const CheckoutDeliveryForm: FC<Props> = ({className}) => {
  const {control} = useFormContext()

  return (
    <WhiteBlock title='3. Адрес доставки' className={className}>
      <div className='flex flex-col gap-5'>
        <Controller
          control={control}
          render={({field, fieldState}) => (
            <>
              <AddressInput onChange={field.onChange}/>
              {fieldState.error?.message && <ErrorText text={fieldState.error.message}/>}
            </>
          )}
          name='address'
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