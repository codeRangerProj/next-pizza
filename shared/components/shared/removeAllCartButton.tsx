import React, {FC} from 'react';
import {Button} from "@/shared/components/ui";
import {LoaderCircle} from "lucide-react";
import {cn} from "@/shared/lib";
import {className} from "postcss-selector-parser";

interface Props {
  removeAllCart: () => void;
  loading?: boolean
}

export const RemoveAllCartButton: FC<Props> = ({removeAllCart, loading}) => {
  return (
    <Button
      onClick={removeAllCart}
      variant={"ghost"}
      size={"sm"}
      className={cn(
        'h-8 w-32 px-3 text-primary rounded-lg hover:bg-primary/10 hover:text-primary',
        {'opacity-50 pointer-events-none': loading},
        className
      )
      }
    >
      Очистить корзину
      {/*{loading*/}
      {/*  ? <LoaderCircle className='size-5 animate-spin text-primary'/>*/}
      {/*  : <p>Очистить корзину</p>*/}
      {/*}*/}
    </Button>
  );
};