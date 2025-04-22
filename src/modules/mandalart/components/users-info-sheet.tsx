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

  return (
    <>
      <div>
        <div>
          <div>현재 접속중인 사람들</div>
          {currentUsers.map((user) => (
            <Avatar key={user.name} className='border border-black hover:z-10'>
              <AvatarImage src={'유저이미지 추가해야함'} />
              <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div>
          <div>전에 접속했던 사람들</div>
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
              className='flex'
            >
              <Input
                value={passwordInputValue}
                onChange={(e) => {
                  setPasswordInputValue(e.target.value);
                }}
              ></Input>
              <Button disabled={isRoomPasswordButtonDisabled}>
                {passwordButtonText}
              </Button>
            </form>
            <Button onClick={handleInviteClick}>초대하기</Button>
          </>
        )}
      </div>
    </>
  );
};

export default UsersInfoSheet;
