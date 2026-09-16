'use client'

import {FC, useEffect, useState} from 'react';
import {cn} from "@/shared/lib/utils";
import {Categories} from "./categories";
import {Container} from "./container";
import {Category} from "@prisma/client";
import {CartButton} from "@/shared/components/shared/cartButton";
import {AnimatePresence, motion} from "framer-motion";

interface Props {
  categories: Category[]
  className?: string;
}

export const TopBar: FC<Props> = ({className, categories}) => {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={cn('sticky top-0 z-10 bg-white py-3 shadow-lg shadow-black/5 sm:py-5', className)}>
      <Container className='flex min-w-0 items-center justify-between gap-3'>
        <Categories items={categories}/>

        <div className='flex shrink-0 items-center gap-2 sm:gap-5'>
          <AnimatePresence>
            {isSticky && (
              <motion.div
                initial={{opacity: 0, x: 30, scale: 0.8}}
                animate={{opacity: 1, x: 0, scale: 1}}
                exit={{opacity: 0, x: 40, scale: 0.8}}
                transition={{duration: 0.25}}
              >
                <CartButton/>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </Container>
    </div>
  );
};