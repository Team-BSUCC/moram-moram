import React from 'react';
import Text from '../commons/text';
import Title from '../commons/title';
import Spacer from '../commons/spacer';
import Button from '../commons/button';

const HeroSection = () => {
  return (
    <div className="min-h-screen w-full bg-[url('/images/landing-img-hero.png')] bg-cover bg-center bg-no-repeat">
      <div className='mx-auto flex h-full max-w-[1440px] items-center px-12'>
        <div className='flex max-w-[520px] flex-col items-start gap-[56px]'>
          <div className='gap[56px] flex w-full flex-col items-start justify-center'>
            <Title as='h1'>목표를 구체적으로, 계획을 실행 가능하게</Title>
            <Spacer size='lg' />
            <Text>막연했던 목표도 차근차근, 구체적인 계획으로. </Text>
            <Text>한 칸씩 채우며 나아가는 여정에 Manda가 함께할게요.</Text>
            <Button>지금 시작하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
