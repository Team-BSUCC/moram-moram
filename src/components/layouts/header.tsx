import URLS from '@/shared/constants/url-constants';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import SignOutButton from '@/modules/auth/components/sign-out-button';

type HeaderProps = {
  user: User | null;
};

const Header = ({ user }: HeaderProps) => {
  const linkStyle =
    'flex items-center justify-center gap-2.5 rounded-lg px-6 py-3 text-md';

  return (
    <div className='h-full w-full border-b bg-white-light'>
      {/* <Header /> 컴포넌트가 들어올 예정입니다. */}
      <div className='flex h-full items-center justify-between'>
        <div className='p-8'>
          <Image
            src='images/manda-logo-text.svg'
            alt='만다로고'
            width='166'
            height='48'
          ></Image>
        </div>
        <div className='flex gap-4 pr-8'>
          {user ? (
            <>
              <Link
                href={URLS.DASHBOARD}
                className={`${linkStyle} bg-[#F0E9E5]`}
              >
                내 만다라트
              </Link>
              <Link
                href={URLS.CALENDAR}
                className={`${linkStyle} bg-[#F0E9E5]`}
              >
                캘린더
              </Link>
              <Link
                href={URLS.TODAY_LIST}
                className={`${linkStyle} bg-[#F0E9E5]`}
              >
                투두리스트
              </Link>
              <SignOutButton />
              <div className='flex gap-2 pl-2'>
                <Avatar className='border border-black hover:z-10'>
                  <AvatarImage src={'유저이미지 추가해야함'} />
                  <AvatarFallback>
                    {user.user_metadata.nickname.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <p className='text-xl'>{user.user_metadata.nickname}</p>
              </div>
            </>
          ) : (
            <>
              <Link href={URLS.SIGN_IN} className={`${linkStyle} bg-[#F0E9E5]`}>
                로그인
              </Link>
              <Link href={URLS.SIGN_UP} className={`${linkStyle} bg-[#F0E9E5]`}>
                회원가입
              </Link>
              <Link
                href={URLS.GUEST}
                className={`${linkStyle} border-2 border-[#F0E9E5]`}
              >
                비회원으로 체험하기
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
