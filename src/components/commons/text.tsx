import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

const textVariants = cva('transition-all', {
  variants: {
    size: {
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
      '24px-regular':
        'text-[18px] leading-[27px] font-normal sm:text-[20px] sm:leading-[30px] md:text-[24px] md:leading-[36px]',
      '20px-bold':
        'text-[16px] leading-[24px] font-bold sm:text-[18px] sm:leading-[27px] md:text-[20px] md:leading-[30px]',
      '20px-medium':
        'text-[16px] leading-[24px] font-medium sm:text-[18px] sm:leading-[27px] md:text-[20px] md:leading-[30px]',
      '20px-regular':
        'text-[16px] leading-[24px] font-normal sm:text-[18px] sm:leading-[27px] md:text-[20px] md:leading-[30px]',
      '18px-semibold':
        'text-[14px] leading-[20px] font-semibold sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[27px]',
      '18px-medium':
        'text-[14px] leading-[20px] font-medium sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[27px]',
      '16px-semibold':
        'text-[14px] leading-[18px] font-semibold sm:text-[15px] sm:leading-[19px] md:text-[16px] md:leading-[20px]',
      '16px-medium':
        'text-[13px] leading-[17px] font-medium sm:text-[14px] sm:leading-[18px] md:text-[16px] md:leading-[20px]',
      '16px-regular':
        'text-[13px] leading-[17px] font-normal sm:text-[14px] sm:leading-[18px] md:text-[16px] md:leading-[20px]',
      '14px-semibold':
        'text-[12px] leading-[16px] font-semibold sm:text-[13px] sm:leading-[16px] md:text-[13px] md:leading-[18px]',
      '14px-regular':
        'text-[12px] leading-[16px] font-normal sm:text-[13px] sm:leading-[16px] md:text-[13px] md:leading-[18px]',
      'logout-button-text':
        'text-[13px] leading-[20px] font-medium sm:text-[14px] sm:leading-[24px] md:text-[16px] lg:text-[20px] lg:leading-[30px]',
    },
    textColor: {
      black: 'text-black',
      white: 'text-white',
      gray: 'text-gray',
      primary: 'text-primary',
      secondary: 'text-secondary',
      lightgray: 'text-gray-lightgray',
      lightwhite: 'text-white-light',
      darkwhite: 'text-white-dark',
      main: 'text-main',
      sub: 'text-sub',
      caption: 'text-caption',
      assist: 'text-assist',
      error: 'text-error',
      focus: 'text-focus',
      email: 'text-email',
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
      normal: 'font-normal',
      md: 'font-medium',
      semi: 'font-semibold',
      bold: 'font-bold',
      extra: 'font-extrabold',
    },
  },
  defaultVariants: {
    textColor: 'main',
    size: '18px-medium',
    align: 'left',
    lean: 'default',
    line: 'default',
  },
});

type TextProps = VariantProps<typeof textVariants> & {
  children: React.ReactNode;
  as?: 'p' | 'span';
  className?: never;
};

/**
 * 텍스트 공통 컴포넌트
 * @param as - p, span 설정
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
  as: Component = 'p',
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
    <Component
      className={twMerge(
        textVariants({ size, textColor, weight, lean, align, line })
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;
