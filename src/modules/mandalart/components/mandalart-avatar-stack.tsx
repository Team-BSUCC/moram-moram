import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import * as React from 'react';
import Text from '@/components/commons/text';
import Dropdown from '@/components/commons/drop-down';
import UsersInfoSheet from './users-info-sheet';
import { User } from '@supabase/supabase-js';
import { useRealtimePresenceRoom } from '../hooks/use-realtime-presence-room';
import { useUsersStore } from '../hooks/use-users-store';

export type AvatarStackProps = {
  user: User | null;
  roomName: string;
};

/**
 * 아바타 스택 컴포넌트
 * @param user - 유저정보
 * @param maxAvatarsAmount - 최대 아바타 스택 개수
 * @param roomName - 만다라트룸네임
 * @returns
 */
const AvatarStack = ({ user, roomName }: AvatarStackProps) => {
  useRealtimePresenceRoom(roomName, user);
  const avatars = useUsersStore((state) => state.currentUsers);

  const MAX_AVATARS_AMOUNT = 3;
  const shownAvatars = avatars.slice(0, MAX_AVATARS_AMOUNT);

  return (
    <TooltipProvider>
      <div className='flex items-center -space-x-4 -space-y-0'>
        {shownAvatars.map(({ name, image }, index) => (
          <Tooltip key={`${name}-${image}-${index}`}>
            <TooltipTrigger asChild>
              <Avatar className='z-10 hover:z-20'>
                <AvatarImage src={image} />
                <AvatarFallback className='bg-white'>
                  {/* 가장 첫글자를 이미지에 표시 ex) 테스트 -> 테 */}
                  {name
                    ?.split(' ')
                    ?.map((word) => word[0])
                    ?.join('')
                    ?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            {/* 아바타 스택 호버 시 보여지는 풀네임 */}
            <TooltipContent>
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        <div className='flex h-[35px] w-[100px] items-center rounded-r-full bg-stroke pl-6'>
          <Text align={'center'}>{avatars.length} / 8</Text>
          <Dropdown selection size='w-auto'>
            <UsersInfoSheet user={user} />
          </Dropdown>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AvatarStack;
