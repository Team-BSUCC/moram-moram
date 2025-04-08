'use client';

import useSignUpForm from '../hooks/use-sign-up-form';
import Text from '@/components/commons/text';
import Input from '@/components/commons/input';
import Button from '@/components/commons/button';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    isPending,
    checkingEmail,
    checkingNickname,
    handleCheckEmail,
    handleCheckNickname,
  } = useSignUpForm();

  return (
    <form
      onSubmit={handleSubmit}
      className='border-gray-300 mx-auto max-w-md space-y-6 rounded-md border bg-white p-6 shadow-sm'
    >
      {/* 에러 메시지 */}
      {errors.root?.message && (
        <Text variant='default' size='sm' align='center'>
          {errors.root.message}
        </Text>
      )}

      {/* 이메일 */}
      <div className='space-y-2'>
        <label
          htmlFor='email'
          className='text-gray-700 block text-sm font-medium'
        >
          이메일
        </label>
        <div className='flex gap-2'>
          <Input id='email' type='email' {...register('email')} />
          <Button
            variant='outline'
            size='default'
            type='button'
            onClick={handleCheckEmail}
            disabled={checkingEmail}
          >
            {checkingEmail ? '확인 중...' : '중복 확인'}
          </Button>
        </div>
        {errors.email && <Text>{errors.email.message}</Text>}
      </div>

      {/* 닉네임 */}
      <div className='space-y-2'>
        <label
          htmlFor='nickname'
          className='text-gray-700 block text-sm font-medium'
        >
          닉네임
        </label>
        <div className='flex gap-2'>
          <Input
            variant='default'
            sizes='md'
            id='nickname'
            type='text'
            {...register('nickname')}
          />
          <Button
            variant='outline'
            size='default'
            type='button'
            onClick={handleCheckNickname}
            disabled={checkingNickname}
          >
            {checkingNickname ? '확인 중...' : '중복 확인'}
          </Button>
        </div>
        {errors.nickname && <Text>{errors.nickname.message}</Text>}
      </div>

      {/* 비밀번호 */}
      <div className='space-y-2'>
        <label
          htmlFor='password'
          className='text-gray-700 block text-sm font-medium'
        >
          비밀번호
        </label>
        <Input
          variant='default'
          sizes='md'
          id='password'
          type='password'
          {...register('password')}
        />
        {errors.password && <Text>{errors.password.message}</Text>}
      </div>

      {/* 비밀번호 확인 */}
      <div className='space-y-2'>
        <label
          htmlFor='confirmPassword'
          className='text-gray-700 block text-sm font-medium'
        >
          비밀번호 확인
        </label>
        <Input
          variant='default'
          sizes='md'
          id='confirmPassword'
          type='password'
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <Text>{errors.confirmPassword.message}</Text>
        )}
      </div>

      {/* 제출 버튼 */}
      <Button
        variant='outline'
        size='default'
        type='submit'
        disabled={isPending}
      >
        {isPending ? '가입 중...' : '회원가입'}
      </Button>
    </form>
  );
};

export default SignUpForm;
