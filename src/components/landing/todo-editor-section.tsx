import Image from 'next/image';
import Spacer from '../commons/spacer';
import Title from '../commons/title';
import Text from '../commons/text';

const TodoEditorSection = () => {
  return (
    <section className='w-full px-4 py-20 sm:px-16 sm:py-40'>
      <div className='mx-auto w-full max-w-screen-xl'>
        {/* 데스크탑/태블릿용 */}
        <div className='hidden items-center justify-between sm:flex sm:gap-20'>
          {/* 텍스트 */}
          <div className='w-full max-w-md'>
            <Title as='h2' size='32px-semibold'>
              각 칸을 클릭하면 투두리스트로 연결
            </Title>
            <Spacer size='xl' />
            <Text size='32px-regular' align='left'>
              중심 목표부터 세부 계획까지
              <br />
              보기 쉽게 시각적으로 정리해요.
            </Text>
          </div>

          {/* 이미지 */}
          <div className='relative aspect-[3/4] w-full max-w-[460px]'>
            <Image
              src='/images/todo/todo.png'
              alt='todo 예시'
              fill
              className='object-contain'
            />
          </div>
        </div>

        {/* 모바일용 */}
        <div className='items-center justify-between sm:hidden'>
          {/* 텍스트 */}
          <div className='flex flex-col items-center justify-center text-center'>
            <Title as='h2' size='18px-semibold'>
              각 칸을 클릭하면 투두리스트로 연결
            </Title>
            <Text size='16px-regular' align='center'>
              중심 목표부터 세부 계획까지
              <br />
              보기 쉽게 시각적으로 정리해요.
            </Text>
          </div>

          <Spacer size='lg' />

          <div className='flex flex-col items-center sm:hidden'>
            {/* 이미지*/}
            <div className='relative aspect-[3/4] w-full max-w-[300px]'>
              <Image
                src='/images/todo/todo.png'
                alt='todo 예시'
                fill
                className='object-contain'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodoEditorSection;
