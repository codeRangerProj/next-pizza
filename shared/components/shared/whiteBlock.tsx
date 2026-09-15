import React from 'react';
import {Title} from './title';
import {cn} from '@/shared/lib/utils';

interface Props {
  title?: string;
  endAdornment?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  endAdornment,
  className,
  contentClassName,
  children,
}) => {
  return (
    <div className={cn('bg-white rounded-3xl', className)}>
      {title && (
        <div className="flex items-center justify-between gap-3 border-b border-gray-100 p-4 sm:p-5 sm:px-7">
          <Title text={title} size="sm" className="text-xl font-bold sm:text-[22px]"/>
          {endAdornment}
        </div>
      )}

      <div className={cn('px-4 py-4 sm:px-5', contentClassName)}>{children}</div>
    </div>
  );
};
