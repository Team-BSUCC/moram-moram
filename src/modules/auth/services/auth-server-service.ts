'use server';

import { getServerClient } from '@/shared/utils/supabase/server-client';
import { SignInDTO, User } from '../types/auth-type';

type PropsSignIn = SignInDTO;
type PropsSignUp = User;

/**
 * @param {Object} params
 * 사용자의 정보를 받아 로그인을 하는 함수
 * @param {string} params.email 사용자 이메일
 * @param {string} params.password 사용자가 설정한 비밀번호
 * @throws {error} supabase 에러
 */

export const signIn = async ({
  email,
  password,
}: PropsSignIn): Promise<{ error: string | null }> => {
  const supabase = getServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return {
    error: error?.message || null,
  };
};

/**
 * @param {Object} params
 * 사용자의 정보를 받아 회원가입을 하는 함수
 * @param {string} params.email 사용자 이메일
 * @param {string} params.password 사용자가 설정한 비밀번호
 * @param {string} params.nickname 사용자가 설정한 닉네임
 * @throws {error} supabase 에러
 */

export const signUp = async ({
  email,
  password,
  nickname,
}: PropsSignUp): Promise<{ error?: string }> => {
  const supabase = getServerClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nickname: nickname },
    },
  });
  if (error) return { error: error.message };
  return { error: undefined };
};

export const signOut = async (): Promise<{ error: string | null }> => {
  const supabase = getServerClient();
  const { error } = await supabase.auth.signOut();
  return { error: error?.message || null };
};

/**
 * 닉네임 중복 체크를 하는 함수
 * @param {string} nickname 사용자가 설정한 닉네임
 * @throws {error} supabase 에러
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
