import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

const textVariants = cva('transition-all', {
  variants: {
    size: {
      default: 'text-sm md:text-md',
      sm: 'text-ss md:text-sm',
      mlg: 'text-md md:text-mlg',
      lg: 'text-mlg md:text-lg',
      xl: 'text-lg md:text-xl',
    },
    textColor: {
      black: 'text-black',
      white: 'text-white',
      gray: 'text-gray',
      primary: 'text-primary',
      secondary: 'text-secondary',
      lightgray: 'text-lightgray',
      lightwhite: 'text-white-light',
      darkwhite: 'text-white-dark',
    },
    align: {
      center: 'text-center',
      left: 'text-left',
      right: 'text-right',
    },
    line: {
      underline: 'underline',
      cancelLine: 'line-through',
      default: 'no-underline',
    },
    lean: {
      default: 'not-italic',
      lean: 'italic',
    },
    weight: {
      default: 'font-normal',
      md: 'font-medium',
      semi: 'font-semibold',
      bold: 'font-bold',
      extra: 'font-extrabold',
    },
  },
  defaultVariants: {
    size: 'default',
    align: 'left',
    weight: 'default',
    lean: 'default',
    line: 'default',
  },
});

type TextProps = VariantProps<typeof textVariants> & {
  children: React.ReactNode;
  className?: never;
};

/**
 * 텍스트 공통 컴포넌트
 * @param size - 텍스트의 크기
 * @param textColor - 텍스트 색상
 * @param align - 텍스트의 정렬 위치
 * @param line - 텍스트 데코레이션 (밑줄, 취소선)
 * @param lean - 텍스트 기울기
 * @param weight - 텍스트 폰트 굵기
 * @param children - 버튼의 기본 속성
 * @returns - 텍스트 컴포넌트
 */
const Text = ({
  size,
  textColor,
  align,
  weight,
  line,
  lean,
  children,
  ...props
}: TextProps) => {
  return (
    <p
      className={twMerge(
        textVariants({ size, textColor, weight, lean, align, line })
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export default Text;
