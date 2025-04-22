'use client';

import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
import { User } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { fetchCheckRoomPasscode } from '../services/fetch-check-room-passcode';
import MandalartMainContent from './mandalart-main-content';
import Spacer from '@/components/commons/spacer';
import Title from '@/components/commons/title';
import Text from '@/components/commons/text';
import { fetchCreateParticipantsUser } from '../services/fetch-create-participants-user';

type MandalartPasswordGateType = {
  user: User | null;
  roomId: string;
  mandalartId: string;
};

const MandalartPasscodeGate = ({
  user,
  roomId,
  mandalartId,
}: MandalartPasswordGateType) => {
  const [passwordInputValue, setPasswordInputValue] = useState<string>('');
  const [isPasscodeMatch, setIsPasscodeMatch] = useState<boolean>(false);
  const handlePasswordSubmit = async () => {
    const isCheckPasscodeResult = await fetchCheckRoomPasscode(
      roomId,
      passwordInputValue
    );
    if (isCheckPasscodeResult) {
      //회원일경우 참가자테이블에 등록
      if (user) {
        if (await fetchCreateParticipantsUser(roomId, user.id)) {
          alert('접속성공 참가자등록완료');
        } else {
          alert('접속성공');
        }
      } else {
        alert('접속성공');
      }
    } else {
      alert('잘못된비밀번호');
    }
    setIsPasscodeMatch(isCheckPasscodeResult);
  };

  return (
    <>
      {isPasscodeMatch ? (
        <MandalartMainContent user={user} mandalartId={mandalartId} />
      ) : (
        <div className='h-full w-full md:bg-backgroundColor'>
          <div className='flex h-full items-center justify-center'>
            <div className='flex w-[400px] flex-col items-center justify-center rounded-lg bg-white-light px-6'>
              <Spacer size='lg' />
              <Title as='h1' size='24px-regular'>
                입장코드 입력
              </Title>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePasswordSubmit();
                }}
              >
                <Spacer size='md' />
                <Text size='20px-regular' textColor='sub' align='center'>
                  참여할 방의 입장코드를 입력해주세요.
                </Text>
                <Text size='20px-regular' textColor='sub' align='center'>
                  입장코드는 초대한 친구가 알고 있어요.
                </Text>
                <Spacer size='md' />
                <Input
                  value={passwordInputValue}
                  //TODO 나중에 auth로 variant 수정
                  variant='default'
                  placeholder='입장코드를 입력해주세요.'
                  onChange={(e) => {
                    setPasswordInputValue(e.target.value);
                  }}
                />
                <Spacer size='lg' />
                <div className='flex justify-between'>
                  <Button
                    variant='outline'
                    type='button'
                    onClick={() => {
                      setPasswordInputValue('');
                    }}
                  >
                    취소
                  </Button>
                  <Button>비밀번호 입력</Button>
                </div>
              </form>
              <Spacer size='lg' />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MandalartPasscodeGate;
