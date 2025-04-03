'use client';

import { useTransition } from 'react';
import { signIn } from '../services/auth-server-service';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { signInSchema, SignInSchema } from '../auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';

const useSignInForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInSchema) => {
    startTransition(async () => {
      const { error } = await signIn(data);
      if (error) {
        setError('root', { message: '아이디나 비밀번호가 일치하지 않습니다!' });
        return;
      }
      router.push('/');
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
  };
};

export default useSignInForm;
