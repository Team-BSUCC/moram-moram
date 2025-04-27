'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Text from '@/components/commons/text';
import SignOutForm from '@/modules/auth/components/sign-out-button';
import { User } from '@supabase/supabase-js';
import {
  deleteAvatar,
  updateNickname,
} from '../../actions/user-profile-action';
import NicknameUI from './nickname-ui';
import AvatarUI from './avatar-ui';
import { useRouter } from 'next/navigation';
import Button from '@/components/commons/button';
import Spacer from '@/components/commons/spacer';
import { errorAlert } from '@/shared/utils/sweet-alert';
import { checkNicknameDuplicated } from '../../services/auth-server-service';
import FormSchema from '@/shared/constants/auth-schema';

type MyPagePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
};

const Profile = ({ isOpen, onClose, user }: MyPagePanelProps) => {
  const userName =
    user.user_metadata?.nickname || user.user_metadata?.name || '';
  const userEmail = user.email;
  const userImage = user.user_metadata?.avatar_url;
  const router = useRouter();

  const [isEditingName, setIsEditingName] = useState(false);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
  const [nickname, setNickname] = useState(userName);
  const [avatarUrl, setAvatarUrl] = useState(userImage ?? '');

  if (!isOpen) return null;

  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', user.id);

    const res = await fetch('/api/avatar', {
      method: 'POST',
      body: formData,
    });

    const { url } = await res.json();
    setAvatarUrl(url);
    router.refresh();
  };

  const handleDeleteAvatar = async () => {
    await deleteAvatar(user.id);
    setAvatarUrl('');
    router.refresh();
  };

  const handleUpdateName = async () => {
    const isDuplicated = await checkNicknameDuplicated(nickname);
    const result = FormSchema.NICKNAME.safeParse(nickname.trim());

    // 유효성 검사
    if (!result.success) {
      errorAlert(result.error.issues[0].message);
      return;
    }

    // 기존 닉네임과 동일한 경우
    if (userName === nickname) {
      errorAlert('현재 닉네임과 일치합니다.');
      return;
    }

    // 닉네임이 중복일 때
    if (isDuplicated) {
      errorAlert('이미 사용중인 닉네임입니다.');
      return;
    }

    await updateNickname(user.id, nickname);
    setIsEditingName(false);
    router.refresh();
  };

  return (
    <>
      {/* 🟡 오버레이 추가 */}
      <div
        className='bg-black/30 fixed inset-0 z-40' // 검은 반투명 배경
        onClick={onClose}
      />
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[314px] transform bg-white-light transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:absolute lg:right-3 lg:top-full lg:mx-3 lg:mt-2 lg:h-[520px] lg:h-auto lg:w-[304px] lg:rounded-[8px] lg:pb-[48px] lg:pt-[64px] lg:shadow-xl lg:transition-none`}
        onClick={() => {
          setIsEditingName(false);
          setShowPhotoMenu(false);
        }}
      >
        {/* 상단 닫기 버튼 */}
        <div className='flex justify-end p-6 lg:absolute lg:right-0 lg:top-0 lg:p-4'>
          <button onClick={onClose}>
            <X className='h-6 w-6 lg:h-9 lg:w-9' />
          </button>
        </div>

        {/* 공통 프로필 영역 */}
        <div className='mb-12 flex flex-col items-center'>
          <div className='flex flex-col items-center justify-center'>
            <AvatarUI
              showPhotoMenu={showPhotoMenu}
              avatarUrl={avatarUrl}
              userName={userName}
              onUpload={handleUploadAvatar}
              onDelete={handleDeleteAvatar}
              showMenu={() => {
                setShowPhotoMenu(!showPhotoMenu);
                setIsEditingName(false);
              }}
            />
            <NicknameUI
              isEditing={isEditingName}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onSubmit={handleUpdateName}
              onEdit={() => setIsEditingName(true)}
            />
            <Spacer size='xs' />
            <Text size='16px-medium' textColor='email'>
              {userEmail}
            </Text>
          </div>
        </div>

        {/* 하단 메뉴 */}
        <div className='flex w-full flex-col'>
          <Button variant='profile'>
            <Text size='logout-button-text'>비밀번호 변경</Text>
          </Button>
          <SignOutForm />
          <Button variant='profile'>
            <Text size='logout-button-text'>계정삭제</Text>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Profile;
