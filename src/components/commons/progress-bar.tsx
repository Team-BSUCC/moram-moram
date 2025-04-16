'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const wrapperVariants = cva(
  'flex items-center gap-4 text-black border-2 rounded-full',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const barVariants = cva('rounded-full h-3', {
  variants: {
    variant: {
      default: 'bg-black',
      green: 'bg-green-900',
    },
    height: {
      sm: 'h-3',
      md: 'h-4',
      lg: 'h-5',
    },
  },
  defaultVariants: {
    variant: 'default',
    height: 'lg',
  },
});

type LinearProgressProps = VariantProps<typeof wrapperVariants> &
  VariantProps<typeof barVariants> & {
    value: number;
  };

/**
 * 직선 프로그래스바 공통 컴포넌트
 * @param value - 진행률 (%)
 * @param variant - 바 색상
 * @param size - 텍스트 크기
 * @param height - 바 높이
 * @returns - 직선 프로그래스바
 */
const LinearProgress = ({
  value,
  variant,
  size,
  height,
}: LinearProgressProps) => {
  return (
    <div className={twMerge(wrapperVariants({ size }))}>
      {/* 진행바 */}
      <div
        className={twMerge('bg-gray-200 w-full overflow-hidden rounded-full')}
      >
        <div
          className={twMerge(barVariants({ variant, height }))}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default LinearProgress;
