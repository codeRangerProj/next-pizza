'use client'

import {FC, useEffect, useState} from 'react';
import {cn} from "@/shared/lib/utils";
import {Categories} from "./categories";
import {SortPopup} from "./sortPopup";
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
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className='flex items-center justify-between'>
        <Categories items={categories}/>

        <div className='flex items-center gap-5'>
          <motion.div layout>
            <SortPopup/>
          </motion.div>

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