import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

const roundButtonVariants = cva(
  'flex items-center justify-center border border-gray-400 rounded-full w-12 h-12 relative overflow-hidden',
  {
    variants: {
      size: {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-16 h-16 text-xl',
        '2xl': 'w-20 h-20 text-2xl',
        '3xl': 'w-24 h-24 text-3xl',
        '4xl': 'w-32 h-32 text-4xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

type RoundButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof roundButtonVariants> & {
    children?: string;
    imgSrc?: string;
    alt?: string;
    className?: never;
  };

/**
 * 버튼 공통 컴포넌트
 * @param variant - 라운드버튼의 테마 종류
 * @param size - 라운드버튼의 크기 종류
 * @param children - 라운드버튼 안에 들어가는 텍스트,이미지
 * @param props - 라운드버튼의 기본 속성
 * @returns - 버튼 컴포넌트
 */
const RoundButton = ({
  size,
  children,
  imgSrc,
  alt = '이미지',
  ...props
}: RoundButtonProps) => {
  return (
    <button className={twMerge(roundButtonVariants({ size }))} {...props}>
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={alt as string}
          className='h-full w-full rounded-full object-contain'
          fill
        ></Image>
      ) : (
        children?.slice(0, 1)
      )}
    </button>
  );
};

export default RoundButton;
