import React, { forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const inputVariants = cva(
  ' w-full py-2 px-0 bg-transparent border-0 border-b border-black focus:ring-0 focus:outline-none placeholder-gray-300 text-inherit',
  {
    variants: {
      variant: {
        default: '',
        outline: 'border-gray-400',
        none: 'border-none',
        auth: 'bg-white border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 text-black focus:outline-none focus:ring-1 focus:ring-primary ',
        nickname: 'h-[44px] w-[156px] rounded-md border border-gray px-4 py-2',
      },
      sizes: {
        '48px-semibold':
          'text-[36px] leading-[54px] font-semibold sm:text-[40px] sm:leading-[60px] md:text-[48px] md:leading-[72px]',
        '40px-semibold':
          'text-[32px] leading-[48px] font-semibold sm:text-[36px] sm:leading-[54px] md:text-[40px] md:leading-[60px]',
        '36px-semibold':
          'text-[28px] leading-[42px] font-semibold sm:text-[32px] sm:leading-[48px] md:text-[36px] md:leading-[54px]',
        '36px-regular':
          'text-[28px] leading-[42px] font-normal sm:text-[32px] sm:leading-[48px] md:text-[36px] md:leading-[54px]',
        '32px-semibold':
          'text-[24px] leading-[36px] font-semibold sm:text-[28px] sm:leading-[42px] md:text-[32px] md:leading-[48px]',
        '32px-regular':
          'text-[24px] leading-[36px] font-normal sm:text-[28px] sm:leading-[42px] md:text-[32px] md:leading-[48px]',
        '32px-medium':
          'text-[24px] leading-[36px] font-medium sm:text-[28px] sm:leading-[42px] md:text-[32px] md:leading-[48px]',
        '28px-regular':
          'text-[20px] leading-[30px] font-normal sm:text-[24px] sm:leading-[36px] md:text-[28px] md:leading-[42px]',
        '24px-semibold':
          'text-[20px] leading-[28px] font-semibold sm:text-[22px] sm:leading-[30px] md:text-[24px] md:leading-[32.4px]',
        '20px-bold':
          'text-[16px] leading-[24px] font-bold sm:text-[18px] sm:leading-[27px] md:text-[20px] md:leading-[30px]',
        '20px-medium':
          'text-[16px] leading-[24px] font-medium sm:text-[18px] sm:leading-[27px] md:text-[20px] md:leading-[30px]',
        '20px-regular':
          'text-[16px] leading-[24px] font-normal sm:text-[18px] sm:leading-[27px] md:text-[20px] md:leading-[30px]',
        '18px-medium':
          'text-[14px] leading-[20px] font-medium sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[27px]',
        '16px-semibold':
          'text-[14px] leading-[18px] font-semibold sm:text-[15px] sm:leading-[19px] md:text-[16px] md:leading-[20px]',
        '16px-medium':
          'text-[13px] leading-[17px] font-medium sm:text-[14px] sm:leading-[18px] md:text-[16px] md:leading-[20px]',
        '16px-regular':
          'text-[13px] leading-[17px] font-normal sm:text-[14px] sm:leading-[18px] md:text-[16px] md:leading-[20px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      sizes: '16px-medium',
    },
  }
);

type InputProps = VariantProps<typeof inputVariants> &
  React.InputHTMLAttributes<HTMLInputElement> & { className?: never };

/**
 * 인풋 공통 컴포넌트
 * @param variant - Input의 테마 종류
 * @param sizes - Input의 크기 종류
 * @returns - <input />
 */

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, sizes, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge(inputVariants({ variant, sizes }))}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
export default Input;
