'use client'

import {FC, useEffect, useState} from 'react';
import {cn} from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {AuthModal, CartButton, Container, ProfileButton, SearchInput} from "@/shared/components/shared";
import {useSearchParams} from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: FC<Props> = ({className, hasSearch = true, hasCart = true}) => {
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    let toastMessage = ''

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ оплачен! Информация отправлена на почту.'
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверждена'
    }

    if (toastMessage) {
      toast.success(toastMessage)
    }

  }, []);

  return (
    <header className={cn('border-b', className)}>
      <Container className='flex flex-wrap items-center justify-between gap-y-4 py-4 sm:flex-nowrap sm:gap-y-0 sm:py-6 lg:py-8'>

        <Link href='/' className='shrink-0'>
          <div className='flex items-center gap-2 sm:gap-4'>
            <Image src='/logo.png' alt='Logo' width={35} height={35} className='h-8 w-8 sm:h-[35px] sm:w-[35px]'/>
            <div>
              <h1 className='text-xl uppercase font-black sm:text-2xl'>Next Pizza</h1>
              <p className='text-sm text-gray-400 leading-3'>Вкусней уже некуда</p>
            </div>
          </div>
        </Link>

        {
          hasSearch &&
          <div className='order-3 w-full sm:order-none sm:mx-4 sm:flex-1 lg:mx-10'>
            <SearchInput/>
          </div>
        }

        <div className='flex items-center gap-2 sm:gap-3'>
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)}/>

          {hasCart && <CartButton/>}
        </div>

      </Container>
    </header>
  );
};