'use client';

import useSignUpForm from '../hooks/use-sign-up-form';

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
      className='mx-auto max-w-md space-y-6 rounded-md border border-gray-300 bg-white p-6 shadow-sm'
    >
      {/* 에러 메시지 */}
      {errors.root?.message && (
        <p className='text-center text-sm text-red-500'>
          {errors.root.message}
        </p>
      )}

      {/* 이메일 */}
      <div className='space-y-2'>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700'
        >
          이메일
        </label>
        <div className='flex gap-2'>
          <input
            id='email'
            type='email'
            {...register('email')}
            className='flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
          <button
            type='button'
            onClick={handleCheckEmail}
            disabled={checkingEmail}
            className='rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50'
          >
            {checkingEmail ? '확인 중...' : '중복 확인'}
          </button>
        </div>
        {errors.email && (
          <p className='text-sm text-red-500'>{errors.email.message}</p>
        )}
      </div>

      {/* 닉네임 */}
      <div className='space-y-2'>
        <label
          htmlFor='nickname'
          className='block text-sm font-medium text-gray-700'
        >
          닉네임
        </label>
        <div className='flex gap-2'>
          <input
            id='nickname'
            type='text'
            {...register('nickname')}
            className='flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
          <button
            type='button'
            onClick={handleCheckNickname}
            disabled={checkingNickname}
            className='rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50'
          >
            {checkingNickname ? '확인 중...' : '중복 확인'}
          </button>
        </div>
        {errors.nickname && (
          <p className='text-sm text-red-500'>{errors.nickname.message}</p>
        )}
      </div>

      {/* 비밀번호 */}
      <div className='space-y-2'>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700'
        >
          비밀번호
        </label>
        <input
          id='password'
          type='password'
          {...register('password')}
          className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
        />
        {errors.password && (
          <p className='text-sm text-red-500'>{errors.password.message}</p>
        )}
      </div>

      {/* 비밀번호 확인 */}
      <div className='space-y-2'>
        <label
          htmlFor='confirmPassword'
          className='block text-sm font-medium text-gray-700'
        >
          비밀번호 확인
        </label>
        <input
          id='confirmPassword'
          type='password'
          {...register('confirmPassword')}
          className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
        />
        {errors.confirmPassword && (
          <p className='text-sm text-red-500'>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* 제출 버튼 */}
      <button
        type='submit'
        disabled={isPending}
        className='w-full rounded-md bg-purple-600 py-2 font-medium text-white hover:bg-purple-700 disabled:opacity-50'
      >
        {isPending ? '가입 중...' : '회원가입'}
      </button>
    </form>
  );
};

export default SignUpForm;
