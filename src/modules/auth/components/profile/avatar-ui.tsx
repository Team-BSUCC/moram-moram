'use client';

import { useState } from 'react';
import { Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type AvatarUIProps = {
  avatarUrl: string;
  userName: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
};

const AvatarUI = ({
  avatarUrl,
  userName,
  onUpload,
  onDelete,
}: AvatarUIProps) => {
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);

  const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpload(e);
    setShowPhotoMenu(false);
  };

  const handleDeleteAvatar = () => {
    onDelete();
    setShowPhotoMenu(false);
  };

  return (
    <div className='group relative h-[100px] w-[100px]'>
      <Avatar className='h-[100px] w-[100px]'>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{userName.slice(0, 1)}</AvatarFallback>
      </Avatar>

      <div
        className='absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.4)] opacity-0 transition-opacity group-hover:opacity-100'
        onClick={() => setShowPhotoMenu((prev) => !prev)}
      >
        <Camera className='text-white' size={24} />
      </div>

      {showPhotoMenu && (
        <div className='absolute left-0 top-3/4 z-20 mt-2 w-[160px] translate-x-1/4 rounded-md border bg-white p-2 shadow'>
          <label
            htmlFor='avatar-upload'
            className='hover:bg-gray-100 block w-full cursor-pointer px-4 py-2 text-left'
          >
            사진 변경하기
          </label>
          <input
            id='avatar-upload'
            type='file'
            hidden
            onChange={(e) => handleUploadAvatar(e)}
          />
          <button
            className='hover:bg-gray-100 w-full px-4 py-2 text-left'
            onClick={handleDeleteAvatar}
          >
            사진 삭제하기
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarUI;
