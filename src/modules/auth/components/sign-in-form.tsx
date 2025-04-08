'use client';

import useSignInForm from '../hooks/use-sign-in-form';
import Button from '@/components/commons/button';
import Input from '@/components/commons/input';

const SignInForm = () => {
  const { register, handleSubmit, errors, isPending } = useSignInForm();
  return (
    <form onSubmit={handleSubmit}>
      {errors && <p>{errors.root?.message}</p>}

      <label htmlFor='email'>이메일</label>
      <Input
        variant='default'
        sizes='md'
        id='email'
        type='email'
        {...register('email')}
      />
      {errors && <p>{errors.email?.message}</p>}

      <label htmlFor='password'>비밀번호</label>
      <Input
        variant='default'
        sizes='md'
        id='password'
        type='password'
        {...register('password')}
      />
      {errors && <p>{errors.password?.message}</p>}

      <Button
        variant='outline'
        size='default'
        type='submit'
        disabled={isPending}
      >
        {isPending ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
};

export default SignInForm;
