'use client';

import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { useGetRoomData } from '../hooks/use-get-room-data';
import { fetchUpdateRoomPassword } from '../services/fetch-update-room-password';

type UsersInfoSheetType = { user: User | null };

const UsersInfoSheet = ({ user }: UsersInfoSheetType) => {
  const [passwordInputValue, setPasswordInputValue] = useState<string>('');
  const [passwordButtonText, setPasswordButtonText] =
    useState<string>('생성하기');
  const [isRoomOwner, setIsRoomOwner] = useState<boolean>(false);

  //나중에 페스파라미터 가져오는 훅으로 리펙터링
  const pathParamRoomId = 'e5a689a9-0f5f-4cdb-935e-9250ca71f60f';
  const { roomData } = useGetRoomData(user, pathParamRoomId);

  useEffect(() => {
    if (roomData) {
      if (user?.id === roomData.owner) {
        setIsRoomOwner(true);
      }
      if (roomData.passcode) {
        setPasswordButtonText('변경하기');
        setPasswordInputValue(roomData.passcode);
      }
      console.log(roomData);
    }
  }, [roomData]);

  const handleSubmitPasswordSetting = async () => {
    if (passwordInputValue === '') return;
    try {
      fetchUpdateRoomPassword(pathParamRoomId, passwordInputValue);
      alert('변경성공');
    } catch (err) {
      console.log(err);
    }
  };

  const isRoomPasswordButtonDisabled = true;

  return (
    <>
      <div>
        {/* 여기 두개는 아바타룸에 정보를 전역으로 관리해서 사용해야지 */}
        <div>현재 접속중인 사람들</div>
        <div>전에 접속했던 사람들</div>
        {/* 이 밑에 부터는 오너만 볼 수 있는 내용 */}

        {isRoomOwner && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitPasswordSetting();
              }}
              className='flex'
            >
              <Input
                value={passwordInputValue}
                onChange={(e) => {
                  setPasswordInputValue(e.target.value);
                }}
              ></Input>
              <Button disabled={true}>{passwordButtonText}</Button>
            </form>
            <Button>초대하기</Button>
          </>
        )}
      </div>
    </>
  );
};

export default UsersInfoSheet;
