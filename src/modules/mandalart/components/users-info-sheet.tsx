'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetRoomData } from '../hooks/use-get-room-data';
import { useUsersStore } from '../hooks/use-users-store';
import { fetchUpdateRoomPasscode } from '../services/fetch-update-room-passcode';
import Spacer from '@/components/commons/spacer';
import Title from '@/components/commons/title';
import { getCurrentUserName } from '@/shared/utils/get-current-user-name';
import Text from '@/components/commons/text';
import { Link } from 'lucide-react';

type UsersInfoSheetType = { user: User | null };

const UsersInfoSheet = ({ user }: UsersInfoSheetType) => {
  const { id: pathParamRoomId }: { id: string } = useParams();
  const { roomData, updateRoomData, isOwner } = useGetRoomData(
    user,
    pathParamRoomId
  );
  const currentUsers = useUsersStore((store) => store.currentUsers);
  const leftUsers = useUsersStore((store) => store.leftUsers);

  const [passwordInputValue, setPasswordInputValue] = useState<string>('');
  const [passwordButtonText, setPasswordButtonText] =
    useState<string>('생성하기');

  useEffect(() => {
    if (roomData) {
      if (roomData.passcode) {
        setPasswordButtonText('변경하기');
        setPasswordInputValue(roomData.passcode);
      }
    }
  }, [roomData]);

  const isRoomPasswordButtonDisabled =
    passwordInputValue === '' || passwordInputValue === roomData?.passcode;

  const isLinkCopButtonDisabled =
    passwordInputValue === '' || passwordInputValue !== roomData?.passcode;

  const handleSetPasswordSubmit = async () => {
    try {
      await fetchUpdateRoomPasscode(pathParamRoomId, passwordInputValue);
      alert('변경성공');
      updateRoomData();
    } catch (error) {
      //TODO 센트리로 리펙터링
      console.log(error);
      alert('변경실패');
    }
  };

  const handleInviteClick = async () => {
    try {
      const inviteText = `초대링크 : ${window.location.href}
      비밀번호 : ${passwordInputValue}
      `;
      await navigator.clipboard.writeText(inviteText);
      alert('클립보드에 복사되었습니다!');
    } catch (error) {
      //TODO 센트리로 리펙터링
      console.log(error);
      alert('복사실패');
    }
  };

  const customButtonClass =
    'disabled:pointer-events-none disabled:text-caption disabled:bg-[#E6E6E6] disabled:border-none w-full inline-flex items-center h-14 text-main w-fit justify-center rounded-lg font-medium outline-none bg-beige-light hover:bg-[#DDCEC5] active:bg-[#CBB2A4] text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[27px] py-[12px] px-[20px] sm:py-[14px] sm:px-[22px] md:py-[16px] md:px-[24px]';

  return (
    <>
      <div className='w-[364px] p-6'>
        <div className='flex flex-col gap-4'>
          <Title as='h3'>현재 접속중인 사람들</Title>
          {currentUsers.map((currentUsers) => (
            <div key={currentUsers.name} className='flex'>
              <Avatar className='border border-black hover:z-10'>
                <AvatarImage src={'유저이미지 추가해야함'} />
                <AvatarFallback>{currentUsers.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              {currentUsers.name === getCurrentUserName(user) ? (
                <div className='flex flex-col justify-between pl-3'>
                  <Text size='16px-semibold'>{currentUsers.name}</Text>
                  <Text size='16px-regular' textColor='sub'>
                    나
                  </Text>
                </div>
              ) : (
                <div className='flex items-center pl-3'>
                  <Text size='16px-regular'>{currentUsers.name}</Text>
                </div>
              )}
            </div>
          ))}
        </div>
        <Spacer size='lg' />
        <div className='flex flex-col gap-4'>
          <Title as='h3'>전에 접속했던 사람들</Title>
          {leftUsers.map((user) => (
            <Avatar key={user.name} className='border border-black hover:z-10'>
              <AvatarImage src={'유저이미지 추가해야함'} />
              <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
          ))}
        </div>

        {isOwner && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSetPasswordSubmit();
              }}
              className='flex h-14 justify-between'
            >
              {/* //TODO 회원가입 머지되면 auth로 스타일 수정 */}
              <div className='w-48'>
                <Input
                  value={passwordInputValue}
                  onChange={(e) => {
                    setPasswordInputValue(e.target.value);
                  }}
                />
              </div>
              <Button
                size='small'
                variant='secondary'
                disabled={isRoomPasswordButtonDisabled}
              >
                {passwordButtonText}
              </Button>
            </form>
            <Spacer size='md' />
            <button
              disabled={isLinkCopButtonDisabled}
              className={customButtonClass}
              onClick={handleInviteClick}
            >
              <Link className='mr-2' />
              초대링크 복사 하기
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default UsersInfoSheet;
