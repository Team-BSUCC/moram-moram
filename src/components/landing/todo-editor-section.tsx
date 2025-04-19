import Image from 'next/image';
import Spacer from '../commons/spacer';
import Title from '../commons/title';
import Text from '../commons/text';

const TodoEditorSection = () => {
  return (
    <div className='mx-auto flex max-h-[1080px] min-h-screen w-full max-w-[1440px] flex-col justify-center'>
      {/*텍스트 영역*/}
      <div className='flex w-full items-center justify-evenly'>
        <div className='w-full max-w-md text-left'>
          <Title as='h2' size='32px-semibold'>
            각 칸을 클릭하면 투두리스트로 연결
          </Title>
          <Spacer size='xl' />
          <Text size='32px-regular'>
            중심 목표부터 세부 계획까지 보기 쉽게 시각적으로 정리해요.
          </Text>
        </div>
        {/*이미지 영역*/}
        <div className='w-full max-w-lg'>
          <Image
            src='/images/todo/todo.png'
            width={500}
            height={500}
            alt='todo 예시'
          />
        </div>
      </div>
    </div>
  );
};

export default TodoEditorSection;
