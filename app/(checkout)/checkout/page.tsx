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
    <Container className='mt-6 sm:mt-10'>
      <Title text='Оформление заказа' className='mb-6 text-[28px] font-extrabold sm:mb-8 sm:text-[36px]'/>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-6 lg:flex-row lg:gap-10'>

            {/* Левая часть*/}
            <div className='mb-12 flex min-w-0 flex-1 flex-col gap-6 sm:gap-10 lg:mb-20'>
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
            <div className='w-full lg:w-[450px] lg:shrink-0'>
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


//test
