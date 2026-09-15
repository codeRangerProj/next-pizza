import {FC} from 'react';
import {signIn, useSession} from "next-auth/react";
import {CircleUser, User} from "lucide-react";
import {Button} from "@/shared/components";
import Link from "next/link";

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: FC<Props> = ({className, onClickSignIn}) => {
  const {data: session} = useSession()

  return (
    <div className={className}>
      {
        !session
          ? <Button onClick={onClickSignIn} variant='outline' className='flex items-center gap-1 px-2 text-xs sm:px-4 sm:text-sm'>
            <User size={16}/>
            Войти
          </Button>
          : <Link href='/profile'>
            <Button variant='secondary' className='flex items-center gap-2 px-2 text-xs sm:px-4 sm:text-sm'>
              <CircleUser size={18}/>
              Профиль
            </Button>
          </Link>
      }
    </div>
  );
};