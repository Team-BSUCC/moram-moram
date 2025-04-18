import { User } from '@supabase/supabase-js';

/**
 * 아바타 이름을 받아오는 함수
 * @returns - 이름, 로그인이 안되어 있을 시 ?
 */
export const getCurrentUserName = (user: User | null) => {
  if (!user) {
    return `게스트-${Math.floor(Math.random() * 1000)}`;
  }
  return user.user_metadata.nickname ?? user.user_metadata.name;
};
