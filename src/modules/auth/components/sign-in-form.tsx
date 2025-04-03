'use client';

import useSignInForm from '../hooks/use-sign-in-form';

const SignInForm = () => {
  const { register, handleSubmit, errors, isPending } = useSignInForm();
  return (
    <form onSubmit={handleSubmit}>
      {errors && <p>{errors.root?.message}</p>}

      <label htmlFor='email'>이메일</label>
      <input id='email' type='email' {...register('email')} />
      {errors && <p>{errors.email?.message}</p>}

      <label htmlFor='password'>비밀번호</label>
      <input id='password' type='password' {...register('password')} />
      {errors && <p>{errors.password?.message}</p>}

      <button type='submit' disabled={isPending}>
        {isPending ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
};

export default SignInForm;
