import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

const roundButtonVariants = cva(
  'flex items-center justify-center border border-gray-400 rounded-full w-12 h-12 relative overflow-hidden',
  {
    variants: {
      size: {
        xs: 'w-4 h-4 text-[8px] md:w-6 md:h-6 md:text-ss',
        sm: 'w-6 h-6 text-ss md:w-8 md:h-8 md:text-sm',
        md: 'w-8 h-8 text-sm md:w-10 md:h-10 md:text-md',
        lg: 'w-10 h-10 text-mlg md:w-12 md:h-12 md:text-lg',
        xl: 'w-14 h-14 text-lg md:w-16 md:h-16 md:text-xl',
        '2xl': 'w-16 h-16 text-xl md:w-20 md:h-20 md:text-2xl',
      },
      borderColor: {
        black: 'border-black',
        white: 'border-white',
        gray: 'border-gray',
        lightgray: 'border-gray-lightgray',
        lightwhite: 'border-white-light',
        darkwhite: 'border-white-dark',
        primary: 'border-primary',
        secondary: 'border-secondary',
      },
      bgColor: {
        kakao: 'bg-[#FDDC3F]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

type RoundButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof roundButtonVariants> & {
    children?: React.ReactNode;
    className?: never;
  };

/**
 * 라운드버튼 공통 컴포넌트
 * @param size - 라운드버튼의 크기 종류
 * @param borderColor - 라운드 버튼 외곽선 색상
 * @param children - 텍스트, 아이콘, 이미지 등 컨텐츠
 * @param props - 기본 버튼 속성
 */
const RoundButton = ({
  size,
  borderColor,
  children,
  bgColor,
  ...props
}: RoundButtonProps) => {
  return (
    <button
      className={twMerge(roundButtonVariants({ size, borderColor, bgColor }))}
      {...props}
    >
      {children}
    </button>
  );
};

export default RoundButton;
