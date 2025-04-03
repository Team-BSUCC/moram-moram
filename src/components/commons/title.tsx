import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const titleVariants = cva(
  `
    `,
  {
    variants: {
      variant: {
        default: 'text-red-400',
      },
      size: {
        default: 'text-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type TitleProps = {
  children: ReactNode;
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
} & VariantProps<typeof titleVariants>;

/**
 * 버튼 공통 컴포넌트
 * @param variant - Title에 테마 종류
 * @param size - Title 크기 종류
 * @param children - Title 안에 들어가는 텍스트
 * @returns - <Heading Tags>{children}</Heading Tags>
 */

const Title = ({ as, size, variant, children }: TitleProps) => {
  const Component = as;

  return (
    <Component className={twMerge(titleVariants({ size, variant }))}>
      {children}
    </Component>
  );
};

export default Title;
