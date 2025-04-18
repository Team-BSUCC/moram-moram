'use client';

import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
import { User } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { fetchCheckRoomPasscode } from '../services/fetch-check-room-passcode';
import MandalartMainContent from './mandalart-main-content';

type MandalartPasswordGateType = {
  user: User | null;
  roomId: string;
};

const MandalartPasscodeGate = ({ user, roomId }: MandalartPasswordGateType) => {
  const [passwordInputValue, setPasswordInputValue] = useState<string>('');
  const [isPasscodeMatch, setPasscodeMatch] = useState<boolean>(false);
  const handlePasswordSubmit = async () => {
    const isCheckPasscodeResult = await fetchCheckRoomPasscode(
      roomId,
      passwordInputValue
    );
    if (isCheckPasscodeResult) {
      alert('접속성공');
    } else {
      alert('잘못된비밀번호');
    }
    setPasscodeMatch(isCheckPasscodeResult);
  };

  return (
    <>
      {isPasscodeMatch ? (
        <MandalartMainContent user={user} />
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
            ></Input>
            <Button>비밀번호입력</Button>
          </form>
        </div>
      )}
    </>
  );
};

export default MandalartPasscodeGate;
