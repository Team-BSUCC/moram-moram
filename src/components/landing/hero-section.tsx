import React from 'react';
import Text from '../commons/text';
import Spacer from '../commons/spacer';
import Button from '../commons/button';
import Title from '../commons/title';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-[url('/images/hero/landing-img-hero.png')] bg-cover bg-center bg-no-repeat">
      {/* 반투명 그라디언트 배경 */}
      <div className='pointer-events-none absolute left-0 top-0 h-full w-1/2 bg-[linear-gradient(to_right,_white_0%,_white_200px,_rgba(255,255,255,0)_100%)]' />
      {/* 텍스트 콘텐츠 */}
      <div className='relative mx-auto min-h-screen w-full max-w-[1440px] items-center pb-[274px] pl-[120px] pr-[257px] pt-[234px]'>
        <div className='h-[416px] w-[1063px]'>
          <div className='flex flex-col items-start'>
            <Title as='h1' size='48px-semibold'>
              목표를 구체적으로,
              <br />
              계획을 실행 가능하게
            </Title>
            {/* 제목 ↔ 본문 간격 */}
            <Spacer size='lg' />
            <Text size='36px-regular' textColor='sub' align='left'>
              막연했던 목표도 차근차근, 구체적인 계획으로.
            </Text>
            <Text size='36px-regular' textColor='sub' align='left'>
              한 칸씩 채우며 나아가는 여정에 Manda가 함께할게요.
            </Text>
            <Spacer size='xl' />
            <Button size='large'>지금 시작하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
