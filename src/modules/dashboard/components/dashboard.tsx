'use client';
import { useState } from 'react';
import Spacer from '@/components/commons/spacer';
import Title from '@/components/commons/title';
import Text from '@/components/commons/text';
import Button from '@/components/commons/button';
import { SquarePlus } from 'lucide-react';
import { CategoryBoard } from './category-board';
import CreateMandalartModal from './create-mandalart-modal';

const DashBoard = ({ user }: { user: string | null }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <Spacer size='top' />
      <div className='flex justify-center'>
        <div className='w-full max-w-[1252px] px-6'>
          <div className='flex justify-between'>
            <div>
              <Title as='h1' size='32px-semibold' textColor='main'>
                내 만다라트
              </Title>
              <Text size='20px-regular' textColor='sub'>
                진행 중인 목표와 완성한 목표를 한 눈에 확인해보세요.
              </Text>
            </div>
            <div className='hidden self-center sm:block'>
              <Button
                variant='secondary'
                size='medium'
                disabled={isCreateModalOpen}
                onClick={() => setIsCreateModalOpen(true)}
              >
                <SquarePlus size={24} /> 새 만다라트
              </Button>
            </div>
          </div>

          <CategoryBoard user={user} />
        </div>
      </div>

      <button
        className='fixed bottom-16 right-6 flex h-20 w-20 items-center justify-center rounded-full bg-beige-light shadow-lg transition-colors ease-in-out hover:bg-[#DDCEC5] active:bg-[#CBB2A4] sm:hidden'
        onClick={() => setIsCreateModalOpen(true)}
      >
        <SquarePlus size={24} />
      </button>

      <CreateMandalartModal
        user={user}
        isOpen={isCreateModalOpen}
        handleClose={() => setIsCreateModalOpen(false)}
      />

      <div className='h-[106px] w-full' />
    </>
  );
};

export default DashBoard;
