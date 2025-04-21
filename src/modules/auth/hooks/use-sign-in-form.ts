'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SignInDTO } from '../types/auth-type';
import FormSchema from '../../../shared/constants/auth-schema';
import URLS from '@/shared/constants/url-constants';

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
    setValue,
  } = useForm<SignInDTO>({
    resolver: zodResolver(signInSchema),
    defaultValues: signInDefaultValue,
  });

  const onSubmit = (data: SignInDTO) => {
    startTransition(async () => {
      const res = await fetch(`/api${URLS.SIGN_IN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setError('root', {
          message: '아이디나 비밀번호가 일치하지 않습니다!',
        });
        return;
      }

      router.push(URLS.HOME);
      router.refresh();
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
    setValue,
  };
};

export default useSignInForm;
