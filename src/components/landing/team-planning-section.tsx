import Image from 'next/image';
import Spacer from '../commons/spacer';
import Text from '../commons/text';
import Title from '../commons/title';

const TeamPlanningSection = () => {
  return (
    <section className='w-full px-4 py-20 sm:px-16 sm:py-40'>
      <div className='mx-auto w-full max-w-screen-xl'>
        {/* 데스크탑/태블릿 전용 */}
        <div className='hidden flex-col items-center sm:flex'>
          <Title as='h2' size='32px-semibold'>
            실시간 협업
          </Title>
          <Spacer size='md' />
          <Text size='32px-regular'>친구/팀원과 함께 작성하고 실행</Text>
          <Spacer size='xl' />
          <div className='w-full max-w-[1200px]'>
            <Image
              src='/images/team/team-explain.png'
              width={1200}
              height={600}
              alt='explain'
              className='h-auto w-full object-contain'
            />
          </div>
        </div>

        {/* 모바일 전용 */}
        <div className='flex flex-col items-center text-center sm:hidden'>
          <Title as='h2' size='18px-semibold'>
            실시간 협업
          </Title>
          <Spacer size='sm' />
          <Text size='16px-regular'>친구/팀원과 함께 작성하고 실행</Text>
          <Spacer size='lg' />
          <div className='w-full max-w-[320px]'>
            <Image
              src='/images/team/team-explain.png'
              width={320}
              height={160}
              alt='explain'
              className='h-auto w-full object-contain'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPlanningSection;
