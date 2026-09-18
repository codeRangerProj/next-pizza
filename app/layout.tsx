import {Nunito} from "next/font/google";
import React, {Suspense} from "react";

import './globals.css';

import {Providers} from "@/shared/components";
import type {Metadata} from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Next Pizza — пицца с доставкой',
    template: '%s | Next Pizza',
  },
  description: 'Закажите пиццу с доставкой от Next Pizza. Большой выбор пиццы, ингредиентов и добавок.',
  openGraph: {
    type: 'website',
    siteName: 'Next Pizza',
    locale: 'ru_RU',
    title: 'Next Pizza — пицца с доставкой',
    description: 'Закажите пиццу с доставкой от Next Pizza. Большой выбор пиццы, ингредиентов и добавок.',
    images: [{url: '/logo.png', width: 512, height: 512, alt: 'Next Pizza'}],
  },
  twitter: {
    card: 'summary',
    title: 'Next Pizza — пицца с доставкой',
    description: 'Закажите пиццу с доставкой от Next Pizza.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
    <head>
      <link data-rh="true" rel="icon" href="/logo.png"/>
    </head>
    <body className={nunito.variable}>
    <Providers>
      <Suspense>
        {children}
      </Suspense>
    </Providers>
    </body>
    </html>
  );
}

