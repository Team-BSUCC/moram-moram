import Button from '../commons/button';
import Spacer from '../commons/spacer';
import Text from '../commons/text';
import Title from '../commons/title';

const CTASection = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-gradient-to-b from-[white] to-[#E9E4F0]'>
      <div className='mx-auto flex h-screen max-h-[1080px] w-full max-w-[1440px] flex-col items-center justify-center text-center'>
        <Text size='32px-medium' align='center'>
          생각은 추상적일 수 있어도, 실천은 구체적이어야 하니까.
        </Text>
        <Spacer size='xl' />
        <Title as='h2' size='32px-semibold'>
          당신의 목표, 지금{' '}
          <Text size='32px-semibold' textColor='primary' align='center'>
            만다
          </Text>
          로 정리해보세요.
        </Title>
        <Spacer size='xl' />
        <Button size='large'>지금 시작하기</Button>
      </div>
    </div>
  );
};

export default CTASection;
