import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const titleVariants = cva('flex gap-4 transition-all', {
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
      '28px-semibold':
        'text-[20px] leading-[30px] font-semibold sm:text-[24px] sm:leading-[36px] md:text-[28px] md:leading-[42px]',
      '28px-regular':
        'text-[20px] leading-[30px] font-normal sm:text-[24px] sm:leading-[36px] md:text-[28px] md:leading-[42px]',
      '24px-semibold':
        'text-[20px] leading-[28px] font-semibold sm:text-[22px] sm:leading-[30px] md:text-[24px] md:leading-[32.4px]',
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
      8: 'bg-sub',
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
      main: 'text-main',
      sub: 'text-sub',
      caption: 'text-caption',
      assist: 'text-assist',
      error: 'text-error',
      focus: 'text-focus',
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
    textColor: 'main',
    size: '18px-medium',
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
  textColor,
  lean,
  line,
  children,
  highlightColor,
  ...props
}: TitleProps) => {
  const Component = as;

  return (
    <Component
      className={twMerge(
        titleVariants({ size, lean, line, weight, textColor })
      )}
      {...props}
    >
      {highlightColor !== undefined && (
        <div className={`w-1 ${titleVariants({ highlightColor })}`}></div>
      )}
      <div className='py-1'>{children}</div>
    </Component>
  );
};

export default Title;
