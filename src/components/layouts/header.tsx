import URLS from '@/shared/constants/url-constants';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type HeaderProps = {
  user: User | null;
};

const Header = ({ user }: HeaderProps) => {
  console.log(user);
  return (
    <div className='h-full w-full'>
      {/* <Header /> 컴포넌트가 들어올 예정입니다. */}
      <div className='flex h-full items-center justify-between bg-pink-pastel'>
        <div className='p-8'>
          <Image
            src='images/manda-log-text-.svg'
            alt='만다로고'
            width='166'
            height='48'
          ></Image>
        </div>
        <div>
          {user ? (
            <>
              <Link href={URLS.DASHBOARD} className='border bg-purple-pastel'>
                내 만다라트
              </Link>
              <Link href={URLS.CALENDAR} className='border bg-purple-pastel'>
                허브
              </Link>
            </>
          ) : (
            <>
              <Link href={URLS.SIGN_IN} className='border bg-purple-pastel'>
                로그인
              </Link>
              <Link href={URLS.SIGN_UP} className='border bg-purple-pastel'>
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
