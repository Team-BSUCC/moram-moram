import { User } from '@supabase/supabase-js';

/**
 * 아바타 이름을 받아오는 함수
 * @returns - 이름, 로그인이 안되어 있을 시 ?
 */
export const getCurrentUserId = (user: User | null): string => {
  if (!user) {
    return crypto.randomUUID();
  } else {
    return user.id;
  }
};
