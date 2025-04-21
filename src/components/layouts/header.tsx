/* eslint-disable indent */
import URLS from '@/shared/constants/url-constants';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import SignOutButton from '@/modules/auth/components/sign-out-button';
import { getCurrentUserName } from '@/shared/utils/get-current-user-name';

type HeaderProps = {
  user: User | null;
};

const Header = ({ user }: HeaderProps) => {
  const linkStyle =
    'flex items-center justify-center gap-2.5 rounded-lg px-6 py-3 text-md';

  const userName = getCurrentUserName(user);

  const menuItems = user
    ? [
        { to: URLS.DASHBOARD, label: '내 만다라트', className: 'bg-[#F0E9E5]' },
        { to: URLS.CALENDAR, label: '캘린더', className: 'bg-[#F0E9E5]' },
        { to: URLS.TODAY_LIST, label: '투두리스트', className: 'bg-[#F0E9E5]' },
      ]
    : [
        { to: URLS.SIGN_IN, label: '로그인', className: 'bg-[#F0E9E5]' },
        { to: URLS.SIGN_UP, label: '회원가입', className: 'bg-[#F0E9E5]' },
        {
          to: URLS.GUEST,
          label: '비회원으로 체험하기',
          className: 'border-2 border-[#F0E9E5]',
        },
      ];

  return (
    <div className='h-full w-full border-b bg-white-light'>
      <div className='flex h-full items-center justify-between'>
        <div className='p-8'>
          <Image
            src='images/manda-logo-text.svg'
            alt='만다로고'
            width='166'
            height='48'
          />
        </div>
        <div className='flex gap-4 pr-8'>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.to}
              className={`${linkStyle} ${item.className}`}
            >
              {item.label}
            </Link>
          ))}

          {user && (
            <>
              <SignOutButton />
              <div className='flex gap-2 pl-2'>
                <Avatar className='border border-black hover:z-10'>
                  <AvatarImage src={'유저이미지 추가해야함'} />
                  <AvatarFallback>{userName.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <p className='text-xl'>{userName}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
