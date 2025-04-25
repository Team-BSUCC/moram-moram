import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
  'inline-flex items-center text-main w-fit justify-center rounded-lg font-semibold outline-none disabled:pointer-events-none disabled:text-caption disabled:bg-[#E6E6E6] disabled:border-none',
  {
    variants: {
      variant: {
        default: 'bg-primary hover:bg-[#BF93E1] active:bg-[#A76BD6]',
        secondary: 'bg-beige-light hover:bg-[#DDCEC5] active:bg-[#CBB2A4]',
        outline:
          'bg-white-light outline outline-[1.5px] outline-beige box-border outline-offset-[0px] hover:outline-[3px] active:outline-[3px] active:outline-[#B3947F]',
        none: 'bg-white-light justify-start w-full rounded-none hover:bg-beige-light active:bg-beige',
        header:
          'bg-transparent hover:font-bold hover:scale-105 active:font-bold text-sub hover:text-main active:text-main',
        profile:
          'bg-transparent justify-start w-full rounded-none hover:bg-beige-light action:bg-beige-light px-6 py-4 text-left lg:px-8 lg:py-4',
      },
      size: {
        large:
          'text-[24px] leading-[36px] font-medium sm:text-[28px] sm:leading-[42px] md:text-[32px] md:leading-[48px] py-[14px] px-[44px] sm:py-[16px] sm:px-[46px] md:py-[18px] md:px-[48px]',
        medium:
          'text-[16px] leading-[24px] font-medium sm:text-[18px] sm:leading-[27px] md:text-[20px] md:leading-[30px] gap-[4px] sm:gap-[6px] md:gap-[8px] py-[11px] px-[28px] sm:py-[11px] sm:px-[30px] md:py-[13px] md:px-[32px]',
        small:
          'text-[14px] leading-[20px] font-medium sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[27px] sm:gap-[4px] md:gap-[6px] py-[8px] px-[20px] sm:py-[10px] sm:px-[22px] md:py-[12px] md:px-[24px]',
        'x-small':
          'text-[13px] leading-[17px] font-medium sm:text-[14px] sm:leading-[18px] md:text-[16px] md:leading-[20px] gap-[2px] sm:gap-[4px] md:gap-[6px] py-[8px] px-[20px] sm:py-[10px] sm:px-[22px] md:py-[12px] md:px-[24px]',
        none: 'text-[14px] leading-[20px] font-medium sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[27px] py-[12px] px-[20px] sm:py-[14px] sm:px-[22px] md:py-[16px] md:px-[24px]',
        header:
          'text-[16px] leading-[24px] font-medium sm:text-[18px] sm:leading-[27px] md:text-[20px] md:leading-[30px] py-[6px] px-[6px] sm:py-[8px] sm:px-[8px] md:py-[10px] md:px-[10px]',
        nickName:
          'text-[16px] leading-[24px] font-medium py-[8px] px-[12px] h-[44px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
    className?: never;
  };

/**
 * 버튼 공통 컴포넌트
 * @param variant - 버튼의 테마 종류
 * @param size - 버튼의 크기 종류
 * @param children - 버튼 안에 들어가는 텍스트
 * @param props - 버튼의 기본 속성
 * @returns - 버튼 컴포넌트
 */
const Button = ({ variant, size, children, ...props }: ButtonProps) => {
  return (
    <button className={twMerge(buttonVariants({ variant, size }))} {...props}>
      {children}
    </button>
  );
};

export default Button;
