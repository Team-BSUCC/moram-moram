'use client';

import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { useGetRoomData } from '../hooks/use-get-room-data';
import { fetchUpdateRoomPasscode } from '../services/fetch-update-room-passcode';
import { useUsersStore } from '../hooks/use-users-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type UsersInfoSheetType = { user: User | null };

const UsersInfoSheet = ({ user }: UsersInfoSheetType) => {
  const [passwordInputValue, setPasswordInputValue] = useState<string>('');
  const [passwordButtonText, setPasswordButtonText] =
    useState<string>('생성하기');

  //나중에 페스파라미터 가져오는 훅으로 리펙터링
  const pathParamRoomId = 'e5a689a9-0f5f-4cdb-935e-9250ca71f60f';
  const { roomData, updateRoomData, isOwner } = useGetRoomData(
    user,
    pathParamRoomId
  );

  const currentUsers = useUsersStore((store) => store.currentUsers);
  const leftUsers = useUsersStore((store) => store.leftUsers);

  useEffect(() => {
    if (roomData) {
      if (roomData.passcode) {
        setPasswordButtonText('변경하기');
        setPasswordInputValue(roomData.passcode);
      }
    }
  }, [roomData]);

  //변경된 비밀번호가 없거나 비어있으면 변경하기 비활성화
  const isRoomPasswordButtonDisabled =
    passwordInputValue === '' || passwordInputValue === roomData?.passcode;

  const handleSetPasswordSubmit = async () => {
    try {
      await fetchUpdateRoomPasscode(pathParamRoomId, passwordInputValue);
      alert('변경성공');
      updateRoomData();
    } catch (err) {
      //TODO 센트리로 리펙터링
      console.log(err);
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
    } catch (err) {
      //TODO 센트리로 리펙터링
      console.log(err);
      alert('복사실패');
    }
  };

  return (
    <>
      <div>
        {/* 여기 두개는 아바타룸에 정보를 전역으로 관리해서 사용해야지 */}
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
        {/* 이 밑에 부터는 오너만 볼 수 있는 내용 */}

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
