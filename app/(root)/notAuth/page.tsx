import {InfoBlock} from "@/shared/components";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Доступ запрещен',
  robots: {
    index: false,
    follow: false,
  },
}

export default function UnauthorizedPage() {
  return (
    <div className='mt-16 flex flex-col items-center justify-center px-4 sm:mt-40'>
      <InfoBlock
        title='Доступ запрещен'
        text='Данную страницу могут просматривать только авторизованные пользователи'
        imageUrl='/assets/images/lock.png'
      />
    </div>
  )
}