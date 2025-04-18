'use client';

import Input from '@/components/commons/input';
import { Tables } from '@/shared/types/database.types';
import { User } from '@supabase/supabase-js';
import React, { useState } from 'react';

type MandalartPasswordGateType = {
  user: User | null;
  roomInfo: Tables<'rooms'>;
};

const MandalartPasswordGate = ({
  user,
  roomInfo,
}: MandalartPasswordGateType) => {
  const [passwordInputValue, setPasswordInputValue] = useState<string>('');

  const handlePasswordSubmit = () => {};

  return (
    <div>
      <form onSubmit={handlePasswordSubmit}>
        <Input
          value={passwordInputValue}
          onChange={(e) => {
            setPasswordInputValue(e.target.value);
          }}
        ></Input>
      </form>
    </div>
  );
};

export default MandalartPasswordGate;
