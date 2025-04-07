'use client';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const wrapperVariants = cva('', {
  variants: {
    size: {
      sm: 'w-20 h-20',
      md: 'w-28 h-28',
      lg: 'w-36 h-36',
    },
  },
  defaultVariants: {
    size: 'md',
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
  strokeWidth = 8,
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
