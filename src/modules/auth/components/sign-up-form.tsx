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
    <form onSubmit={handleSubmit} className='mx-auto max-w-md space-y-4'>
      {errors.root?.message && (
        <p className='text-sm text-red-500'>{errors.root.message}</p>
      )}

      {/* 이메일 */}
      <div>
        <label
          htmlFor='email'
          className='mb-1 block text-sm font-medium text-gray-700'
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
            className='rounded bg-gray-200 px-3 py-2 hover:bg-gray-300'
          >
            {checkingEmail ? '확인 중...' : '중복 확인'}
          </button>
        </div>
        {errors.email && (
          <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>
        )}
      </div>

      <label htmlFor='nickname'>닉네임</label>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input id='nickname' type='text' {...register('nickname')} />
        <button
          type='button'
          onClick={handleCheckNickname}
          disabled={checkingNickname}
        >
          {checkingNickname ? '확인 중...' : '중복 확인'}
        </button>
      </div>
      {errors.nickname && <p>{errors.nickname.message}</p>}

      <label htmlFor='password'>비밀번호</label>
      <input id='password' type='password' {...register('password')} />
      {errors.password && <p>{errors.password.message}</p>}

      <label htmlFor='confirmPassword'>비밀번호 확인</label>
      <input
        id='confirmPassword'
        type='password'
        {...register('confirmPassword')}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <button type='submit' disabled={isPending}>
        {isPending ? '가입 중...' : '회원가입'}
      </button>
    </form>
  );
};

export default SignUpForm;
