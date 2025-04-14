import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { useEffect, useState } from 'react';

/**
 * 아바타 이미지를 받아오는 함수
 * @returns - 이미지 주소 (없으면 null)
 */
export const useCurrentUserImage = () => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserImage = async () => {
      const { data, error } = await getBrowserClient().auth.getSession();
      if (error) {
        console.error(error);
      }

      setImage(data.session?.user.user_metadata.avatar_url ?? null);
    };
    fetchUserImage();
  }, []);

  return image;
};
