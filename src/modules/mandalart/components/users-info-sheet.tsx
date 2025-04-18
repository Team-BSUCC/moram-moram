'use client';

import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { useGetRoomData } from '../hooks/use-get-room-data';

type UsersInfoSheetType = { user: User | null };

const UsersInfoSheet = ({ user }: UsersInfoSheetType) => {
  const [passwordInputValue, setPasswordInputValue] = useState<string>('');
  const [roomPasswordSettingButtonText, setRoomPasswordSettingButtonText] =
    useState<string>('생성하기');
  const [isRoomOwner, setIsRoomOwner] = useState<boolean>(false);
  const { roomData } = useGetRoomData(
    user,
    'e5a689a9-0f5f-4cdb-935e-9250ca71f60f'
  );

  useEffect(() => {
    if (roomData) {
      if (user?.id === roomData.owner) {
        setIsRoomOwner(true);
      }
      if (roomData.passcode) {
        setRoomPasswordSettingButtonText('변경하기');
        setPasswordInputValue(passwordInputValue);
      }
      console.log(roomData);
    }
  }, [roomData]);

  const handleSubmitPasswordSetting = () => {
    if (passwordInputValue === '') return;
  };

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
              <Button onClick={handleSubmitPasswordSetting}>
                {roomPasswordSettingButtonText}
              </Button>
            </form>
            <Button>초대하기</Button>
          </>
        )}
      </div>
    </>
  );
};

export default UsersInfoSheet;
