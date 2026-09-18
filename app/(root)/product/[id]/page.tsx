import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";
import {Container, ProductForm,} from "@/shared/components/shared";
import type {Metadata} from "next";

type ProductPageParams = {
  params: { id: string }
}

export async function generateMetadata(
  {params: {id}}: ProductPageParams,
): Promise<Metadata> {
  const product = await prisma.product.findFirst({
    where: {id: Number(id)},
    include: {
      ingredients: true,
    },
  });

  if (!product) {
    return {
      title: 'Товар не найден',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const ingredients = product.ingredients.map((ingredient) => ingredient.name).join(', ');
  const description = ingredients
    ? `${product.name} с ингредиентами: ${ingredients}. Закажите с доставкой в Next Pizza.`
    : `${product.name} — пицца с доставкой от Next Pizza.`;

  return {
    title: `${product.name} — заказать с доставкой`,
    description,
    alternates: {
      canonical: `/product/${product.id}`,
    },
    openGraph: {
      type: 'website',
      title: `${product.name} — заказать с доставкой`,
      description,
      images: [{url: product.imageUrl, alt: product.name}],
    },
  };
}

export default async function ProductPage({params: {id}}: ProductPageParams) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id)
    },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true
            }
          }
        }
      },
      items: {
        orderBy: {}
      }
    }
  });

  if (!product) {
    return notFound();
  }


  return (
    <Container className="my-5 flex flex-col sm:my-10">
      <ProductForm product={product}/>
    </Container>
  )
}