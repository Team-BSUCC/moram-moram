'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  checkNicknameDuplicated,
  signUp,
} from '../services/auth-server-service';
import { SignUpDTO } from '../types/auth-type';
import FormSchema from '../../../shared/constants/auth-schema';

const useSignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const [checkingNickname, setCheckingNickname] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);

  const router = useRouter();

  const signUpDefaultValue: SignUpDTO = {
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  };

  const signUpSchema = z
    .object({
      email: FormSchema.EMAIL,
      password: FormSchema.PASSWORD,
      confirmPassword: FormSchema.CONFIRM_PASSWORD,
      nickname: FormSchema.NICKNAME,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword'],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    trigger,
  } = useForm<SignUpDTO>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDefaultValue,
  });

  const onSubmit = (data: SignUpDTO) => {
    if (!nicknameChecked) {
      setError('nickname', { message: '닉네임 중복 확인을 해주세요.' });
      return;
    }

    startTransition(async () => {
      const { error } = await signUp({
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      });

      if (error) {
        setError('root', { message: error ?? '회원가입에 실패했습니다.' });
        return;
      }

      router.push('/');
    });
  };

  const handleCheckNickname = async () => {
    const isValid = await trigger('nickname');
    if (!isValid) {
      return;
    }

    const nickname = getValues('nickname');
    setCheckingNickname(true);
    const isTaken = await checkNicknameDuplicated(nickname);
    setCheckingNickname(false);

    if (isTaken) {
      setError('nickname', { message: '이미 사용 중인 닉네임입니다.' });
      setNicknameChecked(false);
    } else {
      setError('nickname', { message: '사용 가능한 닉네임입니다.' });
      setNicknameChecked(true);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
    checkingNickname,
    handleCheckNickname,
  };
};

export default useSignUpForm;
