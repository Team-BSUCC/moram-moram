import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const titleVariants = cva('flex gap-2 transition-all', {
  variants: {
    size: {
      default: 'text-lg md:text-xl',
      sm: 'text-mlg md:text-lg',
      lg: 'text-xl md:text-2xl',
    },
    highlightColor: {
      0: 'bg-pink-pastel',
      1: 'bg-red-pastel',
      2: 'bg-orange-pastel',
      3: 'bg-purple-pastel',
      4: 'bg-yellow-pastel',
      5: 'bg-blue-pastel',
      6: 'bg-sky-pastel',
      7: 'bg-green-pastel',
    },
    weight: {
      default: 'font-normal',
      md: 'font-medium',
      semi: 'font-semibold',
      bold: 'font-bold',
      extra: 'font-extrabold',
    },
    lean: {
      default: 'not-italic',
      lean: 'italic',
    },
    line: {
      default: 'no-underline',
      cancle: 'line-through',
      under: 'underline',
    },
  },
  defaultVariants: {
    size: 'default',
    weight: 'default',
    lean: 'default',
    line: 'default',
  },
});

type TitleProps = {
  children: ReactNode;
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  className?: never;
} & VariantProps<typeof titleVariants>;

/**
 * Title 공통 컴포넌트
 * @param as - Title 헤딩 넘버
 * @param size - Title 크기 종류
 * @param weight - Title 폰트 굵기
 * @param lean - Title 기울기 설정
 * @param line - Title 데코레이션 (밑줄, 취소선)
 * @param highlightColor - Title 하이라이트 추가
 * @param children - Title 안에 들어가는 텍스트
 * @returns - <Heading Tags>{children}</Heading Tags>
 */
const Title = ({
  as,
  size,
  weight,
  lean,
  line,
  children,
  highlightColor,
  ...props
}: TitleProps) => {
  const Component = as;

  return (
    <Component
      className={twMerge(titleVariants({ size, lean, line, weight }))}
      {...props}
    >
      {highlightColor && (
        <div className={`w-1 ${titleVariants({ highlightColor })}`}></div>
      )}
      {children}
    </Component>
  );
};

export default Title;
