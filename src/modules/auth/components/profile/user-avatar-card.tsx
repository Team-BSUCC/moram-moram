'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';

type UserAvatarCardProps = {
  avatarUrl: string;
  userName: string;
  sizeClassName: string;
};

const UserAvatarCard = ({
  avatarUrl,
  userName,
  sizeClassName,
}: UserAvatarCardProps) => {
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState(avatarUrl);
  const [pendingAvatarUrl, setPendingAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (avatarUrl !== currentAvatarUrl) {
      setPendingAvatarUrl(avatarUrl);
    }
  }, [avatarUrl, currentAvatarUrl]);

  return (
    <Avatar className={sizeClassName}>
      {/* 현재 보여줄 아바타 */}
      {currentAvatarUrl && (
        <AvatarImage
          src={currentAvatarUrl}
          alt='프로필 이미지'
          className='object-cover'
        />
      )}

      {/* 새로 로딩 중인 아바타 (투명하게 숨겨놓고 로딩 감지) */}
      {pendingAvatarUrl && (
        <AvatarImage
          src={pendingAvatarUrl}
          alt='새 프로필 이미지 로딩 중'
          className='hidden object-cover' // 숨겨둠
          onLoad={() => {
            setCurrentAvatarUrl(pendingAvatarUrl);
            setPendingAvatarUrl(null);
          }}
        />
      )}

      {/* 아무 이미지 없을 경우 fallback */}
      {!currentAvatarUrl && !pendingAvatarUrl && (
        <AvatarFallback>{userName.slice(0, 1)}</AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatarCard;
