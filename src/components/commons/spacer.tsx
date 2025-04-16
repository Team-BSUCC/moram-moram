import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export const spacerVariants = cva('w-full', {
  variants: {
    size: {
      //예시로 넣어둠
      xs: 'h-1', // 4px
      sm: 'h-2', // 8px
      md: 'h-4', // 16px
      lg: 'h-8', // 32px
      xl: 'h-12', // 48px
      xxl: 'h-16', // 64px
      xxxl: 'h-20', // 80px
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type SpacerProps = VariantProps<typeof spacerVariants>;

/**
 * Spacer 공통 컴포넌트 - 요소들 사이에 위아래 간격을 제공합니다
 * @param size - 간격 크기 (xs, sm, md, lg, xl, 2xl, 3xl)
 * @returns - 간격을 제공하는 div 요소
 */
const Spacer = ({ size }: SpacerProps) => {
  return (
    <div className={twMerge(spacerVariants({ size }))} aria-hidden='true' />
  );
};

export default Spacer;
