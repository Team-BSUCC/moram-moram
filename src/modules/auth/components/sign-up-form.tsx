'use client';

import useSignUpForm from '../hooks/use-sign-up-form';
import Text from '@/components/commons/text';
import Input from '@/components/commons/input';
import Link from 'next/link';
import GoogleLoginButton from './google-login-button';
import KaKaoLoginButton from './kakao-login-button';
import Title from '@/components/commons/title';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    isPending,
    checkingNickname,
    handleCheckNickname,
  } = useSignUpForm();

  return (
    <section className='flex h-full w-full items-center justify-center bg-white-light px-4 py-8 sm:bg-white-dark'>
      <form
        onSubmit={handleSubmit}
        className='flex w-full max-w-[345px] flex-col gap-6 rounded-[12px] bg-white-light px-4 py-6 sm:max-w-[472px] sm:rounded-[16px] sm:p-12'
      >
        <Title as='h1' size='32px-semibold'>
          등록하기
        </Title>

        <div className='w-full space-y-4 sm:space-y-6'>
          <div className='space-y-1 sm:space-y-2'>
            <Input
              type='email'
              placeholder='이메일'
              variant='auth'
              sizes='16px-medium'
              {...register('email')}
            />
            {errors.email && (
              <Text size='16px-regular' textColor='error'>
                {errors.email.message}
              </Text>
            )}
          </div>

          <div className='space-y-1 sm:space-y-2'>
            <Input
              type='password'
              placeholder='비밀번호 (문자,숫자,특수문자 포함 8~20자)'
              variant='auth'
              sizes='16px-medium'
              {...register('password')}
            />
            {errors.password && (
              <Text size='16px-regular' textColor='error'>
                {errors.password.message}
              </Text>
            )}
          </div>

          <div className='space-y-1 sm:space-y-2'>
            <Input
              type='password'
              placeholder='비밀번호 확인'
              variant='auth'
              sizes='16px-medium'
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <Text size='16px-regular' textColor='error'>
                {errors.confirmPassword.message}
              </Text>
            )}
          </div>

          <div className='space-y-1 sm:space-y-2'>
            <div className='flex gap-2'>
              <Input
                type='text'
                placeholder='닉네임'
                variant='auth'
                sizes='16px-medium'
                {...register('nickname')}
              />
              <button
                type='button'
                onClick={handleCheckNickname}
                disabled={checkingNickname}
                className='min-w-[88px] whitespace-nowrap rounded-lg bg-lightgray px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50'
              >
                {checkingNickname ? '확인 중...' : '중복확인'}
              </button>
            </div>
            {errors.nickname && (
              <Text size='16px-regular' textColor='error'>
                {errors.nickname.message}
              </Text>
            )}
          </div>
        </div>

        <button
          type='submit'
          disabled={isPending}
          className='w-full rounded-lg bg-primary py-3 transition hover:bg-[#BF93E1] active:bg-[#A76BD6] disabled:cursor-not-allowed disabled:opacity-50'
        >
          <Text size='18px-medium' align='center'>
            {isPending ? '가입 중...' : '등록하기'}
          </Text>
        </button>

        <Text size='14px-regular' textColor='gray' align='center'>
          가입함으로써 이용 약관 및 개인정보 처리방침에 동의하게 됩니다.
        </Text>

        <div className='w-full border-t pt-4 text-center'>
          <Text size='16px-semibold' align='center'>
            간편하게 시작하기
          </Text>
          <div className='mt-2 flex justify-center gap-4 sm:mt-4'>
            <KaKaoLoginButton />
            <GoogleLoginButton />
          </div>
        </div>

        <div className='flex items-center justify-center gap-2 text-center'>
          <Text size='16px-regular' align='center' as='span'>
            이미 계정이 있으신가요?
          </Text>
          <Link href='/sign-in'>
            <Text
              size='16px-semibold'
              as='span'
              textColor='primary'
              align='center'
            >
              로그인
            </Text>
          </Link>
        </div>

        <Text size='16px-regular' line='underline' align='center'>
          비회원으로 만다라트 작성해보기
        </Text>
      </form>
    </section>
  );
};

export default SignUpForm;
