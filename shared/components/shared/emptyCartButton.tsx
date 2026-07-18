import {FC} from 'react';
import Image from "next/image";
import {Button, SheetClose, Title} from "@/shared/components";
import {ArrowLeft} from "lucide-react";
import Link from "next/link";

interface Props {
  isCheckout?: boolean;
}

export const EmptyCartButton: FC<Props> = ({isCheckout}) => {
  return (
    <div className='flex flex-col items-center justify-center w-72 mx-auto'>
      <Image src='/assets/images/empty-box.png' alt='Empty box' width={120} height={120}/>
      <Title text='Корзина пустая' size='sm' className='text-center font-bold my-2'/>
      <p className='text-center text-neutral-500 mb-5'>
        Добавьте хотя бы один товар, чтобы совершить заказ.
      </p>

      {
        !isCheckout
          ? <SheetClose>
            <Button className='w-56 h-12 text-base' size='lg'>
              <ArrowLeft className='w-5 mr-2'/>
              Вернуться назад
            </Button>
          </SheetClose>
          : <Link href='/'>
            <Button className='w-56 h-12 text-base' size='lg'>
              <ArrowLeft className='w-5 mr-2'/>
              На главную
            </Button>
          </Link>
      }

    </div>
  );
};