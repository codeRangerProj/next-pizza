import React from "react";
import type {Metadata} from "next";
import {Container, Header} from "@/shared/components/shared";

export const metadata: Metadata = {
  title: 'Корзина',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='min-h-screen bg-[#F4F1EE]'>
      <Container>
        <Header className='border-gray-200' hasSearch={false} hasCart={false}/>
        {children}
      </Container>
    </main>
  )
}
