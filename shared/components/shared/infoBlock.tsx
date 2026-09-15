import React from 'react';
import {Button} from '../ui/button';
import {ArrowLeft} from 'lucide-react';
import {Title} from './title';
import Link from 'next/link';
import {cn} from '@/shared/lib/utils';

interface Props {
  title: string;
  text: string;
  className?: string;
  imageUrl?: string;
}

export const InfoBlock: React.FC<Props> = ({className, title, text, imageUrl}) => {
  return (
    <div className={cn(className, 'flex w-full max-w-[840px] flex-col-reverse items-center justify-between gap-8 px-4 sm:flex-row sm:gap-12 sm:px-0')}>
      <div className="flex w-full flex-col sm:w-auto">
        <div className="w-full sm:w-[445px]">
          <Title size="lg" text={title} className="text-[28px] font-extrabold sm:text-[32px]"/>
          <p className="text-base text-gray-400 sm:text-lg">{text}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 sm:mt-11 sm:gap-5">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft/>
              На главную
            </Button>
          </Link>
          <a href="">
            <Button variant="outline" className="text-gray-500 border-gray-400 hover:bg-gray-50">
              Обновить
            </Button>
          </a>
        </div>
      </div>

      <img src={imageUrl} alt={title} width={300}/>
    </div>
  );
};
