'use client';

/* eslint-disable indent */
import URLS from '@/shared/constants/url-constants';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getCurrentUserName } from '@/shared/utils/get-current-user-name';
import { Menu, X } from 'lucide-react';
import Text from '../commons/text';
import Button from '../commons/button';
import Profile from '../../modules/auth/components/profile/profile';
import UserAvatarCard from '@/modules/auth/components/profile/user-avatar-card';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { deleteAuthCookies } from '@/shared/utils/delete-auth-cookie';

type MenuItem = {
  to: string;
  label: string;
  variant:
    | 'header'
    | 'secondary'
    | 'outline'
    | 'default'
    | 'none'
    | null
    | undefined;
  onClick?: () => Promise<void> | void;
};

type HeaderProps = {
  user: User | null;
};

const DESKTOP_SIZE = 1024;

const Header = ({ user }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const hide = useFloatingSheetStore((state) => state.hide);

  const handleDeleteCookies = async () => {
    await deleteAuthCookies();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 메뉴가 열렸을 때 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  // 데스크탑 사이즈가 되었을 때 사이드 메뉴 자동 닫힘
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_SIZE) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const userName = getCurrentUserName(user);

  const menuItems: MenuItem[] = user
    ? [
        { to: URLS.DASHBOARD, label: '내 만다라트', variant: 'header' },
        { to: URLS.CALENDAR, label: '캘린더', variant: 'header' },
        { to: URLS.TODAY_LIST, label: '투두 모아보기', variant: 'header' },
      ]
    : [
        {
          to: URLS.GUEST,
          label: '비회원으로 체험하기',
          variant: 'header',
          onClick: handleDeleteCookies,
        },
        {
          to: URLS.SIGN_IN,
          label: '로그인',
          variant: 'secondary',
          onClick: handleDeleteCookies,
        },
        {
          to: URLS.SIGN_UP,
          label: '3초만에 시작하기',
          variant: 'default',
          onClick: handleDeleteCookies,
        },
      ];

  return (
    <div
      className='h-full bg-white-light shadow-[2px_2px_10px_1px_rgba(0,0,0,0.05)]'
      onClick={hide}
    >
      <div className='flex h-full items-center justify-between'>
        <Link href={URLS.HOME}>
          <button className='px-6 py-4'>
            <Image
              src='/images/manda-logo-text.svg'
              alt='만다로고'
              width='166'
              height='48'
              draggable={false}
              className='hidden lg:block'
              priority={true}
            />
            <Image
              src='/images/manda-logo.svg'
              alt='만다로고'
              width='28'
              height='28'
              draggable={false}
              className='block lg:hidden'
              priority={true}
            />
          </button>
        </Link>

        {/* 데스크탑 메뉴 */}
        <div className='hidden gap-4 pr-8 lg:flex'>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.to}
              onClick={async () => {
                await item.onClick?.();
              }}
            >
              <Button variant={item.variant} size={user ? 'header' : 'none'}>
                {item.label}
              </Button>
            </Link>
          ))}

          {user && (
            <div className='relative flex items-center justify-center'>
              <div
                className='flex cursor-pointer items-center gap-2 pl-2'
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <UserAvatarCard
                  avatarUrl={user.user_metadata.avatar_url}
                  userName={userName}
                  sizeClassName='border border-black hover:z-10'
                />
                <div className='pr-[10px]'>
                  <Text size='20px-medium'>{userName}</Text>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 햄버거 메뉴 아이콘  */}
        <button onClick={toggleMenu} className='h-full px-8 py-5 lg:hidden'>
          <Menu size={24} />
        </button>
      </div>

      {/* 사이드 메뉴 오버레이 */}
      {isMenuOpen && (
        <div className='fixed inset-0 z-10 bg-black' onClick={toggleMenu}></div>
      )}

      {/* 사이드 메뉴 패널 */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[314px] transform bg-white-light transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex justify-end p-6'>
          <button onClick={toggleMenu}>
            <X size={24} />
          </button>
        </div>

        <div className='flex flex-col items-start'>
          {user && (
            <div>
              <div
                className='mb-4 flex w-full cursor-pointer items-center gap-2 px-4'
                onClick={() => setIsProfileOpen(true)}
              >
                <UserAvatarCard
                  avatarUrl={user.user_metadata.avatar_url}
                  userName={userName}
                  sizeClassName='border border-black hover:z-10'
                />
                <Text size='20px-medium'>{userName}</Text>
              </div>
            </div>
          )}
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.to}
              onClick={async () => {
                toggleMenu();
                await item.onClick?.();
              }}
              className='w-full'
            >
              <Button variant='none' size='none'>
                <Text size='16px-medium'>{item.label}</Text>
              </Button>
            </Link>
          ))}
        </div>
      </div>
      {/* Profile 공통 */}
      {user && isProfileOpen && (
        <Profile
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
        />
      )}
    </div>
  );
};

export default Header;
