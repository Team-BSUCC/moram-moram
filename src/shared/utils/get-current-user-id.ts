import { User } from '@supabase/supabase-js';

/**
 * 아바타 이름을 받아오는 함수
 * @returns - 이름, 로그인이 안되어 있을 시 ?
 */
export const getCurrentUserId = (user: User | null): string => {
  if (!user) {
    let guestId = localStorage.getItem('guestId');
    if (guestId !== null) {
      return guestId;
    } else {
      guestId = crypto.randomUUID();
      localStorage.setItem('guestId', guestId);
      return guestId;
    }
  } else {
    return user.id;
  }
};
