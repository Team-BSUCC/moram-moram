'use client';

import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
import { User } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { fetchCheckRoomPasscode } from '../services/fetch-check-room-passcode';
import MandalartMainContent from './mandalart-main-content';
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
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePasswordSubmit();
            }}
          >
            <Input
              value={passwordInputValue}
              onChange={(e) => {
                setPasswordInputValue(e.target.value);
              }}
            />
            <Button>비밀번호입력</Button>
          </form>
        </div>
      )}
    </>
  );
};

export default MandalartPasscodeGate;
