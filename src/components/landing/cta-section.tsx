import Link from 'next/link';
import Button from '../commons/button';
import Spacer from '../commons/spacer';
import Text from '../commons/text';
import Title from '../commons/title';
import URLS from '@/shared/constants/url-constants';

const CTASection = () => {
  return (
    <section className='flex max-h-[1080px] min-h-screen w-full items-center justify-center bg-gradient-to-b from-white to-[#E9E4F0] px-4 py-20 sm:px-16 sm:py-40'>
      <div className='w-full max-w-screen-xl'>
        {/* 데스크탑/태블릿 전용 */}
        <div className='hidden flex-col items-center text-center sm:flex'>
          <Text size='32px-medium' align='center'>
            생각은 추상적일 수 있어도, 실천은 구체적이어야 하니까.
          </Text>
          <Spacer size='xl' />
          <Title as='h2' size='32px-semibold'>
            당신의 목표, 지금
            <Text size='32px-semibold' textColor='primary' align='center'>
              만다
            </Text>
            로 정리해보세요.
          </Title>
          <Spacer size='xl' />
          <Link href={URLS.DASHBOARD}>
            <Button size='large'>
              <Text size='32px-medium'>지금 시작하기</Text>
            </Button>
          </Link>
        </div>

        {/* 모바일 전용 */}
        <div className='flex flex-col items-center text-center sm:hidden'>
          <Text size='16px-regular' align='center'>
            생각은 추상적일 수 있어도, <br />
            실천은 구체적이어야 하니까.
          </Text>
          <Spacer size='lg' />
          <Title as='h2' size='18px-semibold'>
            당신의 목표, 지금
            <Text size='16px-semibold' textColor='primary' align='center'>
              만다
            </Text>
            로 정리해보세요.
          </Title>
          <Spacer size='lg' />
          <Link href={URLS.DASHBOARD}>
            <Button size='medium'>
              <Text size='20px-medium'>지금 시작하기</Text>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
