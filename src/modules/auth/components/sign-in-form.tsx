'use client';

import useSignInForm from '../hooks/use-sign-in-form';
import Text from '@/components/commons/text';
import Input from '@/components/commons/input';
import Link from 'next/link';
import GoogleLoginButton from './google-login-button';
import KaKaoLoginButton from './kakao-login-button';
import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import URLS from '@/shared/constants/url-constants';
import Title from '@/components/commons/title';

const SignInForm = () => {
  const { register, handleSubmit, errors, isPending, setValue } =
    useSignInForm();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setValue('password', password);
  }, [password, setValue]);

  return (
    <section className='flex h-full w-full items-center justify-center bg-white-light sm:bg-white-dark'>
      <form
        onSubmit={handleSubmit}
        className='flex h-[640px] w-full max-w-[345px] flex-col gap-6 rounded-[12px] bg-white-light px-4 py-6 sm:max-w-[472px] sm:rounded-[16px] sm:p-12'
      >
        <Title as='h1' size='28px-semibold'>
          로그인
        </Title>
        {errors.root && (
          <Text size='18px-medium' textColor='error' align='center'>
            {errors.root.message}
          </Text>
        )}
        <div className='w-full space-y-4 sm:space-y-6'>
          <div className='space-y-1 sm:space-y-2'>
            <Input
              id='email'
              type='text'
              placeholder='이메일'
              variant='auth'
              sizes='16px-medium'
              {...register('email')}
            />
            {errors.email && <Text>{errors.email.message}</Text>}
          </div>

          <div className='space-y-1 sm:space-y-2'>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='비밀번호'
                variant='auth'
                sizes='16px-medium'
                autoComplete='current-password'
              />
              <button
                type='button'
                onClick={() => setShowPassword((prev) => !prev)}
                className='text-gray-500 absolute right-3 top-1/2 -translate-y-1/2'
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {errors.password && <Text>{errors.password.message}</Text>}
          </div>
        </div>

        <button
          type='submit'
          disabled={isPending}
          className='w-full rounded-lg bg-primary py-3 text-sm font-semibold text-black transition hover:bg-[#BF93E1] active:bg-[#A76BD6] disabled:cursor-not-allowed disabled:opacity-50'
        >
          <Text size='16px-medium' align='center'>
            {isPending ? '로그인 중...' : '로그인'}
          </Text>
        </button>

        <div className='text-gray-500 flex w-full justify-center pt-4 text-sm'>
          {/* TODO 추후 추가 예정 */}
          {/* <Link href='/find-id'>아이디 찾기</Link>
          <Link href='/reset-password'>비밀번호 재설정</Link> */}
          <Link href={URLS.SIGN_UP}>
            <Text size='16px-semibold' textColor='caption'>
              회원가입
            </Text>
          </Link>
        </div>

        <div className='flex w-full flex-col gap-6 border-t pt-4 text-center'>
          <Text size='16px-semibold' align='center'>
            간편 로그인
          </Text>
          <div className='mt-2 flex justify-center gap-4'>
            <KaKaoLoginButton />
            <GoogleLoginButton />
          </div>
          <Link href={URLS.GUEST}>
            <Text size='16px-regular' line='underline' align='center'>
              비회원으로 만다라트 작성해보기
            </Text>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignInForm;
