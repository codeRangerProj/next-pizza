import {Container, Filters, ProductsGroupList, Title, TopBar, Stories} from "@/shared/components";
import {Suspense} from "react";
import {findPizzas, GetSearchParams} from "@/shared/lib/findPizzas";


export default async function Home({searchParams}: { searchParams: GetSearchParams }) {
  const categories = await findPizzas(searchParams)

  return (
    <>
      <Container className='mt-6 sm:mt-10'>
        <Title text='Все пиццы' size='lg' className='text-[28px] font-extrabold sm:text-[32px]'/>
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)}/>

      <Stories/>

      <Container className='mt-6 pb-10 sm:mt-10 sm:pb-14'>
        <div className='flex flex-col gap-8 lg:flex-row lg:gap-[80px]'>
          <div className='w-full lg:w-[250px] lg:shrink-0'>
            <Suspense>
              <Filters/>
            </Suspense>
          </div>

          <div className='min-w-0 flex-1'>
            <div className='flex flex-col gap-16'>
              {
                categories.map((category) => (
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      categoryId={category.id}
                      title={category.name}
                      items={category.products}
                    />
                  )
                ))
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
