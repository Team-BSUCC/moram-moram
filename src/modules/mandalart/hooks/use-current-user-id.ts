import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { useEffect, useState } from 'react';

/**
 * 현재 유저 ID를 반환
 * - 로그인된 유저: Supabase user_metadata.id
 * - 비로그인 유저: 로컬스토리지 기반 익명 UUID
 * - isReady: ID가 완전히 준비되었는지 여부
 */
export const useCurrentUserId = () => {
  const [userId, setUserId] = useState<string>('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      const { data, error } = await getBrowserClient().auth.getSession();
      if (error) {
        console.error('Auth error:', error);
      }

      // 로그인 회원은 session에 있는 아이디 저장
      if (data.session?.user) {
        const userId = data.session.user.user_metadata.id;
        setUserId(userId);
      } else {
        // 익명 유저용 UUID 로컬스토리지에 저장
        const storedId = localStorage.getItem('anonymous_id');
        if (storedId) {
          setUserId(storedId);
        } else {
          const newId = crypto.randomUUID();
          localStorage.setItem('anonymous_id', newId);
          setUserId(newId);
        }
      }

      setIsReady(true);
    };

    fetchUserId();
  }, []);

  return { userId, isReady };
};
