import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import Text from '@/components/commons/text';
import Dropdown from '@/components/commons/drop-down';
import UsersInfoSheet from './users-info-sheet';
import { User } from '@supabase/supabase-js';

/**
 * 아바타 스택의 방향 결정 (가로 or 세로)
 */
const avatarStackVariants = cva('flex -space-x-4 -space-y-4', {
  variants: {
    orientation: {
      vertical: 'flex-row',
      horizontal: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

export interface AvatarStackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarStackVariants> {
  avatars: { name: string; image: string }[];
  maxAvatarsAmount?: number;
  user: User | null;
}

/**
 * 아바타 스택 컴포넌트
 * @param className - 컨테이너 스타일
 * @param orientation - 아바타 스택 방향 (가로 or 세로)
 * @param avatars - 아바타 배열 ([{name: '', image: ''}, {}])
 * @param maxAvatarsAmount - 최대 아바타 스택 개수
 * @returns
 */
const AvatarStack = ({
  className,
  orientation,
  user,
  avatars,
  maxAvatarsAmount = 3,
  ...props
}: AvatarStackProps) => {
  // 화면에 보여줄 아바타 컴포넌트
  const shownAvatars = avatars.slice(0, maxAvatarsAmount);
  // 화면에 보여주지 않을 아바타 컴포넌트(최대 개수 이상 접속 시)

  return (
    <TooltipProvider>
      <div
        className={cn(
          avatarStackVariants({ orientation }),
          className,
          'flex items-center',
          orientation === 'horizontal' ? '-space-x-0' : '-space-y-0'
        )}
        {...props}
      >
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

export { AvatarStack, avatarStackVariants };
