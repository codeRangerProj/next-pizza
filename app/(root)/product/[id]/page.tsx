import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";
import {Container, ProductForm,} from "@/shared/components/shared";

export default async function ProductPage({params: {id}}: { params: { id: string } }) {
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