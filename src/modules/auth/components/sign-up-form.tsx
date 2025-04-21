'use client';

import useSignUpForm from '../hooks/use-sign-up-form';
import Text from '@/components/commons/text';
import Input from '@/components/commons/input';
import Spacer from '@/components/commons/spacer';
import Link from 'next/link';
import GoogleLoginButton from './google-login-button';
import KaKaoLoginButton from './kakao-login-button';

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
    <section className='flex min-h-screen w-full items-center justify-center bg-[#fff] px-4 py-10 sm:bg-white-dark'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-[345px] rounded-[8px] bg-[#fff] sm:max-w-[472px]'
      >
        {/* PC 전용 레이아웃 */}
        <div className='hidden sm:flex sm:flex-col sm:items-center sm:gap-6 sm:rounded-[16px] sm:p-12'>
          <Text size='24px-semibold'>등록하기</Text>

          <div className='w-full space-y-6'>
            <div className='space-y-2'>
              <label htmlFor='email' className='text-gray-500 text-sm'>
                이메일
              </label>
              <Input
                id='email'
                placeholder='이메일'
                variant='auth'
                sizes='16px-medium'
                {...register('email')}
              />
              {errors.email && <Text>{errors.email.message}</Text>}
            </div>
            <div className='space-y-2'>
              <label htmlFor='password' className='text-gray-500 text-sm'>
                비밀번호 (문자,숫자,특수문자 포함 8~20자)
              </label>
              <Input
                id='password'
                type='password'
                placeholder='비밀번호 (문자,숫자,특수문자 포함 8~20자)'
                variant='auth'
                sizes='16px-medium'
                {...register('password')}
              />
              {errors.password && <Text>{errors.password.message}</Text>}
            </div>
            <div className='space-y-2'>
              <label
                htmlFor='confirmPassword'
                className='text-gray-500 text-sm'
              >
                비밀번호 확인
              </label>
              <Input
                id='confirmPassword'
                type='password'
                placeholder='비밀번호 확인'
                variant='auth'
                sizes='16px-medium'
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <Text>{errors.confirmPassword.message}</Text>
              )}
            </div>
            <div className='space-y-2'>
              <label htmlFor='nickname' className='text-gray-500 text-sm'>
                닉네임
              </label>
              <div className='flex gap-2'>
                <Input
                  id='nickname'
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
                  className='min-w-[88px] whitespace-nowrap rounded-lg bg-lightgray px-4 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50'
                >
                  {checkingNickname ? '확인 중...' : '중복확인'}
                </button>
              </div>
              {errors.nickname && <Text>{errors.nickname.message}</Text>}
            </div>
          </div>

          <button
            type='submit'
            disabled={isPending}
            className='mt-4 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-black transition hover:bg-[#BF93E1] active:bg-[#A76BD6] disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isPending ? '가입 중...' : '등록하기'}
          </button>

          <Text size='14px-regular' textColor='gray' align='center'>
            가입함으로써 이용 약관 및 개인정보 처리방침에 동의하게 됩니다.
          </Text>

          <div className='flex w-full flex-col items-center justify-center border-t pt-4 text-center'>
            <Text size='16px-semibold'>간편하게 시작하기</Text>
            <div className='mt-2 flex justify-center gap-4'>
              <KaKaoLoginButton />
              <GoogleLoginButton />
            </div>
          </div>

          <div className='space-y-1 text-center'>
            <Text size='16px-regular'>
              이미 계정이 있으신가요?{' '}
              <Link href='/sign-in' className='text-primary'>
                로그인
              </Link>
            </Text>
            <Spacer size='md' />
            <Text size='16px-regular' line='underline'>
              비회원으로 만다라트 작성해보기
            </Text>
          </div>
        </div>

        {/* 모바일 전용 레이아웃 */}
        <div className='flex flex-col items-center gap-6 rounded-[12px] px-4 py-6 sm:hidden'>
          <Text size='24px-semibold'>등록하기</Text>

          <div className='w-full space-y-4'>
            <div className='space-y-1'>
              <label htmlFor='email' className='text-gray-500 text-sm'>
                이메일
              </label>
              <Input
                id='email'
                placeholder='이메일'
                variant='auth'
                sizes='16px-medium'
                {...register('email')}
              />
              {errors.email && <Text>{errors.email.message}</Text>}
            </div>
            <div className='space-y-1'>
              <label htmlFor='password' className='text-gray-500 text-sm'>
                비밀번호 (문자,숫자,특수문자 포함 8~20자)
              </label>
              <Input
                id='password'
                type='password'
                placeholder='비밀번호 (문자,숫자,특수문자 포함 8~20자)'
                variant='auth'
                sizes='16px-medium'
                {...register('password')}
              />
              {errors.password && <Text>{errors.password.message}</Text>}
            </div>
            <div className='space-y-1'>
              <label
                htmlFor='confirmPassword'
                className='text-gray-500 text-sm'
              >
                비밀번호 확인
              </label>
              <Input
                id='confirmPassword'
                type='password'
                placeholder='비밀번호 확인'
                variant='auth'
                sizes='16px-medium'
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <Text>{errors.confirmPassword.message}</Text>
              )}
            </div>
            <div className='space-y-1'>
              <label htmlFor='nickname' className='text-gray-500 text-sm'>
                닉네임
              </label>
              <div className='flex gap-2'>
                <Input
                  id='nickname'
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
                  className='min-w-[88px] whitespace-nowrap rounded-lg bg-lightgray px-4 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50'
                >
                  {checkingNickname ? '확인 중...' : '중복확인'}
                </button>
              </div>
              {errors.nickname && <Text>{errors.nickname.message}</Text>}
            </div>
          </div>

          <button
            type='submit'
            disabled={isPending}
            className='w-full rounded-lg bg-primary py-3 text-sm font-semibold text-black transition hover:bg-[#BF93E1] active:bg-[#A76BD6] disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isPending ? '가입 중...' : '등록하기'}
          </button>

          <Text size='14px-regular' textColor='gray' align='center'>
            가입함으로써 이용 약관 및 개인정보 처리방침에 동의하게 됩니다.
          </Text>

          <div className='w-full border-t pt-4 text-center'>
            <Text size='16px-semibold' align='center'>
              간편하게 시작하기
            </Text>
            <div className='mt-2 flex justify-center gap-4'>
              <GoogleLoginButton />
              <KaKaoLoginButton />
            </div>
          </div>

          <div className='space-y-1 text-center'>
            <Text size='16px-regular'>
              이미 계정이 있으신가요?{' '}
              <Link href='/sign-in' className='text-primary'>
                로그인
              </Link>
            </Text>
            <Spacer size='sm' />
            <Text size='16px-regular' line='underline'>
              비회원으로 만다라트 작성해보기
            </Text>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUpForm;
