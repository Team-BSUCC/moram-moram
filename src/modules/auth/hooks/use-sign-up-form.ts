'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { signUpSchema, SignUpSchema } from '../auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  checkEmailDuplicated,
  checkNicknameDuplicated,
  signUp,
} from '../services/auth-server-service';

const useSignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [checkingNickname, setCheckingNickname] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    trigger,
  } = useForm<SignUpSchema>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    },
  });

  const onSubmit = (data: SignUpSchema) => {
    if (!emailChecked) {
      setError('email', { message: '이메일 중복 확인을 해주세요.' });
      return;
    }
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

  const handleCheckEmail = async () => {
    const isValid = await trigger('email');
    if (!isValid) {
      return;
    }

    const email = getValues('email');
    setCheckingEmail(true);
    const isTaken = await checkEmailDuplicated(email);
    setCheckingEmail(false);

    if (isTaken) {
      setError('email', { message: '이미 사용 중인 이메일입니다.' });
      setEmailChecked(false);
    } else {
      setError('email', { message: '사용 가능한 이메일입니다.' });
      setEmailChecked(true);
    }
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
    checkingEmail,
    checkingNickname,
    handleCheckEmail,
    handleCheckNickname,
  };
};

export default useSignUpForm;
