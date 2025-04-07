import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

const textVariants = cva(
  '', // 기본 스타일
  {
    variants: {
      variant: {
        default: '',
      },
      size: {
        default: '',
        sm: '',
        md: '',
        lg: '',
      },
      align: {
        center: 'text-center',
        left: 'text-left',
        right: 'text-right',
      },
      line: {
        underline: 'underline',
        cancelLine: 'line-through',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      align: 'center',
      line: null,
    },
  }
);

type TextProps = VariantProps<typeof textVariants> & {
  children: React.ReactNode;
  className?: never;
};

/**
 * 텍스트 공통 컴포넌트
 * @param variant - 텍스트의 종류 (일반, 취소선, 밑줄 등)
 * @param size - 텍스트의 크기
 * @param align - 텍스트의 정렬 위치
 * @param color - 텍스트 색상
 * @param children - 버튼의 기본 속성
 * @returns - 텍스트 컴포넌트
 */
const Text = ({
  variant,
  size,
  align,
  line,
  children,
  ...props
}: TextProps) => {
  return (
    <p
      className={twMerge(textVariants({ variant, size, align, line }))}
      {...props}
    >
      {children}
    </p>
  );
};

export default Text;
