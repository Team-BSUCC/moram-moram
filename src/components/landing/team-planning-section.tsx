import Image from 'next/image';
import Spacer from '../commons/spacer';
import Text from '../commons/text';
import Title from '../commons/title';

const TeamPlanningSection = () => {
  return (
    <div className='mx-auto flex h-screen max-h-[1080px] w-full max-w-[1440px] flex-col items-center justify-center'>
      {/* 텍스트 영역 */}
      <div className='flex w-full flex-col items-center justify-center'>
        <Title as='h2' size='32px-semibold'>
          실시간 협업
        </Title>
        <Spacer size='md' />
        <Text size='32px-regular'>친구/팀원과 함께 작성하고 실행</Text>
      </div>

      {/* 사진 영역 */}
      <Image
        src='/images/team/team-explain.png'
        width={1200}
        height={600}
        alt='explain'
      />
    </div>
  );
};

export default TeamPlanningSection;
