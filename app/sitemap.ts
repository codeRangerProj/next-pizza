import type {MetadataRoute} from 'next';
import {prisma} from '@/prisma/prisma-client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const products = await prisma.product.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  });

  return [
    {
      url: siteUrl,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...products.map((product) => ({
      url: `${siteUrl}/product/${product.id}`,
      lastModified: product.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
