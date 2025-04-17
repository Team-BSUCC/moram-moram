import Image from 'next/image';
import Spacer from '../commons/spacer';

const TeamPlanningSection = () => {
  return (
    <section className='flex min-h-screen w-full flex-col items-center justify-center'>
      {/* 텍스트 영역 */}
      <div className='flex w-full flex-col items-center justify-center'>
        <h1 className='text-[36px] font-bold'>실시간 협업</h1>
        <p className='text-[32px]'>친구/팀원과 함께 작성하고 실행</p>
      </div>
      <Spacer size='xl' />
      {/* 사진 영역 */}
      <Image
        src='/images/team/team-explain.png'
        width={1200}
        height={600}
        alt='explain'
      />
    </section>
  );
};

export default TeamPlanningSection;
