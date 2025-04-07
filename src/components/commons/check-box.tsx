import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const checkBoxVariants = cva(
  'relative flex items-center justify-center border rounded-md transition-all cursor-pointer',
  {
    variants: {
      color: {
        default: 'border-gray bg-white peer-checked:bg-blue-500',
      },
      sizes: {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-10 h-10',
      },
    },
    defaultVariants: {
      color: 'default',
      sizes: 'md',
    },
  }
);

/**
 * SVG 크기를 sizes props에 매핑
 */

const svgSizes = {
  sm: { width: 10, height: 10 },
  md: { width: 16, height: 16 },
  lg: { width: 20, height: 20 },
  xl: { width: 24, height: 24 },
};

type CheckBoxProps = VariantProps<typeof checkBoxVariants> & {
  checked?: boolean;
  onChange?: () => void;
  className?: never;
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * 체크박스 공통 컴포넌트
 * @param color - CheckBox의 체크 됐을 때의 색상
 * @param sizes - CheckBox 크기 종류
 * @param checked - CheckBox check 상태
 * @param onChange - CheckBox의 상태가 변화하면 실행하는 함수
 * @returns - <input type='checkbox' />
 */
const CheckBox = ({
  color,
  sizes,
  checked,
  onChange,
  ...props
}: CheckBoxProps) => {
  const { width, height } =
    svgSizes[sizes as keyof typeof svgSizes] || svgSizes.md;

  return (
    <label className='relative inline-flex items-center'>
      <input
        type='checkbox'
        className='peer hidden'
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <div className={twMerge(checkBoxVariants({ color, sizes }))}>
        <svg
          width={width}
          height={height}
          viewBox='0 0 16 12'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M14 1.5L5.0506 10.5L2 7.43215'
            stroke='white'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    </label>
  );
};

export default CheckBox;
