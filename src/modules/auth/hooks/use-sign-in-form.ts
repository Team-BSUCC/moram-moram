'use client';

import { useTransition } from 'react';
import { signIn } from '../services/auth-server-service';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import FormSchema from '../../../shared/constants/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInDTO } from '../types/auth-type';
import { z } from 'zod';

const signInDefaultValue: SignInDTO = {
  email: '',
  password: '',
};

const signInSchema = z.object({
  email: FormSchema.NON_EMPTY,
  password: FormSchema.NON_EMPTY,
});

const useSignInForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInDTO>({
    resolver: zodResolver(signInSchema),
    defaultValues: signInDefaultValue,
  });

  const onSubmit = (data: SignInDTO) => {
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
