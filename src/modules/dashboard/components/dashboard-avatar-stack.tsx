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

/**
 * 아바타 스택의 방향 결정 (가로 or 세로)
 */
const avatarStackVariants = cva(
  'flex relative gap-[8px] -space-x-4 -space-y-4',
  {
    variants: {
      orientation: {
        vertical: 'flex-row',
        horizontal: 'flex-col',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  }
);

export interface AvatarStackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarStackVariants> {
  avatars: { name: string; image: string }[];
  maxAvatarsAmount?: number;
}

/**
 * 아바타 스택 컴포넌트
 * @param className - 컨테이너 스타일
 * @param orientation - 아바타 스택 방향 (가로 or 세로)
 * @param avatars - 아바타 배열 ([{name: '', image: ''}, {}])
 * @param maxAvatarsAmount - 최대 아바타 스택 개수
 * @returns
 */
const DashboardAvatarStack = ({
  className,
  orientation,
  avatars,
  maxAvatarsAmount = 3,
  ...props
}: AvatarStackProps) => {
  // 화면에 보여줄 아바타 컴포넌트
  const shownAvatars = avatars.slice(0, maxAvatarsAmount);
  // 화면에 보여주지 않을 아바타 컴포넌트(최대 개수 이상 접속 시)
  const hiddenAvatars = avatars.slice(maxAvatarsAmount);

  return (
    <TooltipProvider>
      <div
        className={cn(
          avatarStackVariants({ orientation }),
          className,
          orientation === 'horizontal' ? '-space-x-0' : '-space-y-0'
        )}
        {...props}
      >
        {shownAvatars.map(({ name, image }, index) => (
          <Tooltip key={`${name}-${image}-${index}`}>
            <TooltipTrigger asChild>
              <Avatar
                className='h-[22px] w-[22px] border-[2px] border-stroke bg-white-light text-md hover:z-10'
                style={{ zIndex: 5 - index }}
              >
                <AvatarImage src={image} />
                <AvatarFallback>
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

        {hiddenAvatars.length ? (
          <Tooltip key='hidden-avatars'>
            <TooltipTrigger asChild>
              <Avatar className='z-0 h-[22px] w-[32px] bg-lightgray text-md'>
                <AvatarFallback>
                  {/* 3개 이상 시 +(개수)로 아바타 표시 */}+
                  {avatars.length - shownAvatars.length}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              {/* 툴팁에 숨겨진 모든 사용자 이름 목록 표시 */}
              {hiddenAvatars.map(({ name }, index) => (
                <p key={`${name}-${index}`}>{name}</p>
              ))}
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
    </TooltipProvider>
  );
};

export { DashboardAvatarStack, avatarStackVariants };
