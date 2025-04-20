import { User } from '@supabase/supabase-js';

/**
 * 아바타 이름을 받아오는 함수
 * TODO 나중에 유저 식별할 수 있게 구성 해야할 듯 지금은 유저 아바타스텍이랑 불일치
 * @returns - 이름, 로그인이 안되어 있을 시 ?
 */
export const getCurrentUserName = (user: User | null): string => {
  if (!user) {
    return `게스트-${Math.floor(Math.random() * 1000)}`;
  }
  return user.user_metadata.nickname ?? user.user_metadata.name;
};
