import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { useEffect, useState } from 'react';

/**
 * 아바타 이름을 받아오는 함수
 * @returns - 이름, 로그인이 안되어 있을 시 ?
 */
export const useCurrentUserName = () => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const fetchProfileName = async () => {
      const { data, error } = await getBrowserClient().auth.getSession();
      if (error) {
        console.error(error);
      }

      setName(
        data.session?.user.user_metadata.nickname ??
          data.session?.user.user_metadata.name ??
          `게스트-${Math.floor(Math.random() * 1000)}`
      );
    };

    fetchProfileName();
  }, []);

  return name;
};
