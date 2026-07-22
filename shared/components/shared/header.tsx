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
      <Container className='flex items-center justify-between py-8'>

        <Link href='/'>
          <div className='flex items-center gap-4'>
            <Image src='/logo.png' alt='Logo' width={35} height={35}/>
            <div>
              <h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
              <p className='text-sm text-gray-400 leading-3'>Вкусней уже некуда</p>
            </div>
          </div>
        </Link>

        {
          hasSearch &&
          <div className='mx-10 flex-1'>
            <SearchInput/>
          </div>
        }

        <div className='flex items-center gap-3'>
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)}/>

          {hasCart && <CartButton/>}
        </div>

      </Container>
    </header>
  );
};