import Button from '@/components/commons/button';
import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import { CategoryBoard } from '@/modules/dashboard/components/category-board';
import { MandalartType } from '@/modules/mandalart/types/realtime-type';
import { getServerClient } from '@/shared/utils/supabase/server-client';

const DashBoardPage = async () => {
  /**
   * TODO : fetch문 리팩토링 및 동적 id로 fetct하기,
   */
  const supabase = getServerClient();
  const { data } = await supabase
    .from('mandalarts')
    .select('*')
    .eq('id', '6424de9b-7fbf-470a-9743-c9bb5e3cdad8');

  const info: MandalartType & { done_count: number } = (data ?? [])[0];

  /**
   * TODO : absolute 리팩토링하기
   */
  return (
    <div className='right-0 flex h-full w-full justify-center bg-white-dark'>
      <div className='w-full max-w-[1440px] p-6'>
        <Spacer size='3xl' />
        <div className='flex justify-between'>
          <div>
            <Title as='h1' variant='default'>
              내 만다라트
            </Title>
            <Text variant='default'>
              진행 중인 목표와 완성한 목표를 한 눈에 확인해보세요.
            </Text>
          </div>
          <div className='h-fit self-center'>
            <Button variant='outline'>+ 새 만다라트</Button>
          </div>
        </div>
        <Spacer size='xl' />
        <CategoryBoard info={info} />
      </div>
    </div>
  );
};

export default DashBoardPage;
