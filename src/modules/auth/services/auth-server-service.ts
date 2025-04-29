'use server';

import { User } from '@supabase/supabase-js';
import { getServerClient } from '@/shared/utils/supabase/server-client';
import { getServerClientAction } from '@/shared/utils/supabase/server-client-action';
import { UpdatePasswordDTO, UserType } from '../types/auth-type';
import * as Sentry from '@sentry/nextjs';
import { deleteAuthCookies } from '@/shared/utils/delete-auth-cookie';

type PropsSignUp = UserType;

/**
 * @param params
 * 사용자의 정보를 받아 회원가입을 하는 함수
 * @param params.email 사용자 이메일
 * @param params.password 사용자가 설정한 비밀번호
 * @param params.nickname 사용자가 설정한 닉네임
 * @throws supabase 에러
 */

export const signUp = async ({
  email,
  password,
  nickname,
}: PropsSignUp): Promise<{ error?: string }> => {
  const supabase = getServerClientAction();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nickname: nickname },
    },
  });
  if (error) {
    Sentry.withScope((scope) => {
      scope.setTag('page', 'sign-up');
      scope.setTag('feature', 'signUp');

      Sentry.captureException(new Error(`[signUp] ${error.message}`));
    });
    return { error: error.message };
  }
  return { error: undefined };
};

/**
 * 로그아웃 함수자가 설정한 닉네임
 * @return error 메세지 혹은 null
 */
export const signOut = async (): Promise<{ error: string | null }> => {
  const supabase = getServerClientAction();
  const { error } = await supabase.auth.signOut();
  deleteAuthCookies();

  return { error: error?.message || null };
};

/**
 * 닉네임 중복 체크를 하는 함수
 * @param nickname 사용자가 설정한 닉네임
 * @throws supabase 에러
 */

export const checkNicknameDuplicated = async (
  nickname: string
): Promise<boolean> => {
  const supabase = getServerClient();
  const { data } = await supabase
    .from('users')
    .select('id')
    .eq('nickname', nickname)
    .single();
  if (data) {
    return true;
  } else {
    return false;
  }
};

/**
 * 이메일 중복 체크를 하는 함수
 * @param email 사용자가 설정한 닉네임
 * @throws supabase 에러
 */
export const checkEmailDuplicated = async (email: string): Promise<boolean> => {
  const supabase = getServerClient();
  const { data } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();
  if (data) {
    return true;
  } else {
    return false;
  }
};

/**
 * 로그인된 유저의 정보를 가져오는 함수
 *
 */
export const getUserInfo = async (): Promise<User | null> => {
  const supabase = getServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }
  return user;
};

/**
 * access token이 만료되면 refresh token으로 새로고침 해주는 함수
 *
 */
export const refreshSession = async () => {
  const supabase = getServerClientAction();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return {
    user,
    error: error?.message ?? null,
  };
};

/**
 * 비밀번호 재설정 링크를 메일로 전송하는 함수
 * @param password 사용자 email
 */
export const updatePassword = async ({
  email,
  currentPassword,
  newPassword,
}: UpdatePasswordDTO): Promise<void> => {
  const supabase = getServerClientAction();
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });
  if (signInError) {
    throw new Error('현재 비밀번호가 올바르지 않습니다.');
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (updateError) {
    Sentry.withScope((scope) => {
      scope.setTag('page', 'mypage');
      scope.setTag('feature', 'updateError');

      Sentry.captureException(
        new Error(`[updatePassword] ${updateError.message}`)
      );
    });

    throw new Error(updateError.message);
  }
};
