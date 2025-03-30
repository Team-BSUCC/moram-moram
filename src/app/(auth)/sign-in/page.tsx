'use client';

import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { useState } from 'react';

const SignInPage = () => {
  const [signInFormData, setSignInFormData] = useState({
    email: '',
    password: '',
  });

  const [alertBox, setAlertBox] = useState('');

  const supabase = getBrowserClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignInFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignIn = async () => {
    const email = signInFormData.email.trim();
    const password = signInFormData.password;

    if (!email || !password) {
      setAlertBox('이메일/비밀번호가 비어있어요!');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAlertBox('로그인 실패');
    } else {
      setAlertBox('로그인 성공');
    }
  };

  return (
    <div className='space-y-4 p-4'>
      <p>{alertBox}</p>
      <h1 className='text-xl font-bold'>로그인</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
        className='space-y-2'
      >
        <div>
          <label htmlFor='email'>이메일</label>
          <input
            id='email'
            type='email'
            className='w-full border p-2'
            value={signInFormData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='password'>비밀번호</label>
          <input
            id='password'
            type='password'
            className='w-full border p-2'
            value={signInFormData.password}
            onChange={handleChange}
          />
        </div>
        <button type='submit' className='rounded bg-black p-2 text-white'>
          로그인
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
