'use client'

import {zodResolver} from "@hookform/resolvers/zod";
import {FormProvider, useForm} from "react-hook-form";

import {
  CheckoutSidebar,
  Container,
  Title,
  CheckoutCart,
  CheckoutDeliveryForm,
  CheckoutPersonalForm
} from "@/shared/components";
import {useCart} from "@/shared/hooks/useCart";
import {checkoutFormSchema, TCheckoutFormValues} from "@/shared/constants";
import {createOrder} from "@/app/actions";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {Api} from "@/shared/services/api-client";

export default function CheckoutPage() {
  const {
    totalAmount,
    updateItemQuantity,
    removeCartItem,
    removeAllCart,
    items,
    loading
  } = useCart()

  const [submitting, setSubmitting] = useState(false)
  const {data: session} = useSession()


  const form = useForm<TCheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: '',
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    }
  })

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe()
      const [firstName, lastName] = data.fullName.split(" ")

      form.setValue('firstName', firstName)
      form.setValue('lastName', lastName)
      form.setValue('email', data.email)
    }

    if (session) {
      fetchUserInfo()
    }
  }, [session]);

  const onSubmit = async (data: TCheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });

      if (url) {
        location.href = url;
      }

    } catch (err) {
      console.error(err);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  }

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    void updateItemQuantity(id, newQuantity)
  };

  return (
    <Container className='mt-10'>
      <Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]'/>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex gap-10'>

            {/* Левая часть*/}
            <div className='flex flex-col gap-10 flex-1 mb-20'>
              <CheckoutCart
                items={items}
                removeCartItem={removeCartItem}
                onClickCountButton={onClickCountButton}
                loading={loading}
                removeAllCart={removeAllCart}
                totalAmount={totalAmount}
              />

              <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''}/>
              <CheckoutDeliveryForm className={loading ? 'opacity-40 pointer-events-none' : ''}/>

            </div>

            {/* Правая часть*/}
            <div className='w-[450px]'>
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}

///21 50 18

