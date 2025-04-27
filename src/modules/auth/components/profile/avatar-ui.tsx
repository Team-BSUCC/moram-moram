'use client';

import { Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type AvatarUIProps = {
  showPhotoMenu: boolean;
  avatarUrl: string;
  userName: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  showMenu: () => void;
};

const AvatarUI = ({
  showPhotoMenu,
  avatarUrl,
  userName,
  onUpload,
  onDelete,
  showMenu,
}: AvatarUIProps) => {
  return (
    <div className='relative h-[100px] w-[100px]'>
      <div className='group relative h-full w-full'>
        <Avatar className='h-full w-full'>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{userName.slice(0, 1)}</AvatarFallback>
        </Avatar>

        {/* Hover 오버레이 */}
        <div
          className='absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.4)] opacity-0 transition-opacity group-hover:opacity-100'
          onClick={(e) => {
            e.stopPropagation();
            showMenu();
          }}
        >
          <Camera className='text-white' size={24} />
        </div>
      </div>

      {showPhotoMenu && (
        <div
          className='absolute left-0 top-3/4 z-20 mt-2 w-[160px] translate-x-1/4 rounded-md border bg-white p-2 shadow'
          onClick={(e) => e.stopPropagation()}
        >
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
            onChange={(e) => {
              onUpload(e);
              e.stopPropagation();
            }}
          />
          <button
            className='hover:bg-gray-100 w-full px-4 py-2 text-left'
            onClick={onDelete}
          >
            사진 삭제하기
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarUI;
