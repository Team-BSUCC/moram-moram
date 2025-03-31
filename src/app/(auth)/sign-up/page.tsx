'use client';

import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { useState } from 'react';

const SignUpPage = () => {
  const [signUpFormData, setSignUpFormData] = useState({
    email: '',
    password: '',
    nickname: '',
  });

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignUpFormData((prev) => ({ ...prev, [id]: value }));
  };

  const supabase = getBrowserClient();

  const handleSignUpSubmit = async () => {
    await supabase.auth.signUp({
      email: signUpFormData.email,
      password: signUpFormData.password,
      options: {
        data: {
          nickname: signUpFormData.nickname,
        },
      },
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUpSubmit();
        }}
      >
        <p>이메일</p>
        <input
          className='border-2'
          id='email'
          value={signUpFormData.email}
          type='email'
          onChange={handleSignUpChange}
        />
        <p>비밀번호</p>
        <input
          className='border-2'
          id='password'
          value={signUpFormData.password}
          type='password'
          onChange={handleSignUpChange}
        />
        <p>닉네임</p>
        <input
          className='border-2'
          id='nickname'
          value={signUpFormData.nickname}
          type='text'
          onChange={handleSignUpChange}
        />
        <br />
        <button className='border-2' type='submit'>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
