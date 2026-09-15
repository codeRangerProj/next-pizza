import {cn} from '@/shared/lib/utils';
import {FC} from "react";

interface Props {
  name: string;
  details: string;
  className?: string;
}

export const CartItemInfo: FC<Props> = ({name, details, className}) => {
  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="flex-1 text-base font-bold leading-6 sm:text-lg">{name}</h2>
      </div>
      {details && <p className="text-xs text-gray-400 w-full">{details}</p>}
    </div>
  );
};
