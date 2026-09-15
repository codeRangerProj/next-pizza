import {cn} from '@/shared/lib/utils';
import {FC} from "react";

interface Props {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: FC<Props> = ({src, className}) => {
  return <img className={cn('h-12 w-12 shrink-0 sm:h-[60px] sm:w-[60px]', className)} src={src} alt={'img'}/>;
};
