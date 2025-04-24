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
  const [newName, setNewName] = useState(userName);
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
    await updateNickname(user.id, newName);
    setIsEditingName(false);
    router.refresh();
  };

  return (
    <div
      className={`fixed -top-2 right-0 z-50 h-full w-4/5 max-w-[314px] transform bg-white transition-transform duration-300 ease-in-out lg:absolute lg:right-2 lg:top-full lg:mx-3 lg:mt-2 lg:h-auto lg:w-[304px] lg:rounded-[8px] lg:pb-[48px] lg:pt-[64px] lg:shadow-xl ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0`}
    >
      {/* 상단 닫기 버튼 */}
      <div className='flex justify-end p-6 lg:absolute lg:right-4 lg:top-4'>
        <button onClick={onClose}>
          <X className='h-6 w-6 lg:h-9 lg:w-9' />
        </button>
      </div>

      {/* 공통 프로필 영역 */}
      <div className='mb-12 flex flex-col items-center'>
        <div className='flex w-[152px] flex-col items-center justify-center'>
          <AvatarUI
            avatarUrl={avatarUrl}
            userName={userName}
            onUpload={handleUploadAvatar}
            onDelete={handleDeleteAvatar}
          />
          <NicknameUI
            isEditing={isEditingName}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onSubmit={handleUpdateName}
            onEdit={() => setIsEditingName(true)}
          />
          <Text size='16px-medium' textColor='sub'>
            {userEmail}
          </Text>
        </div>
      </div>

      {/* 하단 메뉴 */}
      <div className='mt-6 flex w-full flex-col'>
        <button className='px-6 py-4 text-left lg:px-8'>
          <Text size='logout-button-text'>비밀번호 변경</Text>
        </button>
        <SignOutForm />
        <button className='px-6 py-4 text-left lg:px-8'>
          <Text size='logout-button-text'>계정삭제</Text>
        </button>
      </div>
    </div>
  );
};

export default Profile;
