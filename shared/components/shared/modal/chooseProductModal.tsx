"use client"

import {FC} from 'react';
import {cn} from "@/shared/lib/utils";
import {Dialog, DialogContent, DialogTitle} from '@/shared/components/ui/dialog';
import {useRouter} from "next/navigation";
import {ProductWithRelations} from "@/@types/prisma";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {ProductForm} from "@/shared/components/shared";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: FC<Props> = ({className, product}) => {
  const router = useRouter()

  return (
    <Dialog
      open={Boolean(product)}
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden',
          className
        )}>
        <ProductForm product={product} onSubmit={() => router.back()}/>
        {/*<VisuallyHidden><DialogTitle></DialogTitle></VisuallyHidden>*/}
        {/*{*/}
        {/*  <ProductForm product={product}/>*/}
        {/*}*/}
      </DialogContent>
    </Dialog>
  );
};