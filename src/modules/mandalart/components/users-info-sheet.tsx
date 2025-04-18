'use client';

import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import React, { useEffect, useState } from 'react';

const UsersInfoSheet = () => {
  const [passwordInputValue, setPasswordInputValue] = useState<string>('');
  const [roomPasswordSettingButtonText, setRoomPasswordSettingButtonText] =
    useState<string>('');
  const [isRoomOwner, setIsRoomOwer] = useState<boolean>(false);
  const handleSubmitPasswordSetting = () => {
    if (passwordInputValue === '') return;
  };

  /**
   *  TODO : 나중에 룸 ID로 만다라트 페이지 접근하는걸로 바뀌면 eq 부분 url에서 가져오늘걸로 수정
   */
  useEffect(() => {
    const fetchGetRoomPassword = async () => {
      const supabase = getBrowserClient();
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', 'e5a689a9-0f5f-4cdb-935e-9250ca71f60f');
      console.log(data);
    };

    fetchGetRoomPassword();
  }, []);

  return (
    <>
      <div>
        {/* 여기 두개는 아바타룸에 정보를 전역으로 관리해서 사용해야지 */}
        <div>현재 접속중인 사람들</div>
        <div>전에 접속했던 사람들</div>
        {/* 이 밑에 부터는 오너만 볼 수 있는 내용 */}

        {isRoomOwner && (
          <>
            <form onSubmit={handleSubmitPasswordSetting} className='flex'>
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
