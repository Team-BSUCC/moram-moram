'use client';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const wrapperVariants = cva('transition-all select-none', {
  variants: {
    size: {
      sm: 'w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20',
      default: 'w-24 h-24 sm:w-26 sm:h-26 md:w-28 md:h-28',
      lg: 'w-32 h-32 sm:w-34 sm:h-34 md:w-36 md:h-36',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

type CircularProgressProps = VariantProps<typeof wrapperVariants> & {
  value: number;
  strokeWidth?: number;
  pathColor?: string;
  trailColor?: string;
  textColor?: string;
  textSize?: string;
};

/**
 * 원형 차트 공통 컴포넌트
 * @param value - 차트에 표시할 값 (0 ~ 100)
 * @param strokeWidth - 원형 테두리의 두께
 * @param pathColor - 진행된 부분 색상
 * @param trailColor - 남은 부분 색상
 * @param textColor - 텍스트 색상
 * @param textSize - 텍스트 사이즈(%)
 * @param size - 원형 차트 래퍼의 크기
 * @returns - 원형 차트 컴포넌트
 */
const CircularProgress = ({
  value,
  strokeWidth = 9,
  pathColor = '#111827',
  trailColor = '#e5e7eb',
  textColor = '#111827',
  textSize = '15px',
  size,
}: CircularProgressProps) => {
  return (
    <div className={twMerge(wrapperVariants({ size }))}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        minValue={0}
        maxValue={100}
        strokeWidth={strokeWidth}
        styles={buildStyles({
          pathColor,
          trailColor,
          textColor,
          textSize,
        })}
      />
    </div>
  );
};

export default CircularProgress;
