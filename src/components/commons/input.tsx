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
      },
      sizes: {
        sm: 'text-ss md:text-sm',
        md: 'test-sm md:text-md',
        lg: 'text-mlg md:text-lg',
        xl: 'text-lg md:text-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      sizes: 'md',
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
