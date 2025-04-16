'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { MandalartType } from '@/modules/mandalart/types/realtime-type';
import MandalartCard from './mandalart-card';
import Spacer from '@/components/commons/spacer';
import { getColorWithNumber } from '@/shared/utils/get-color-with-number';
import Text from '@/components/commons/text';

type CategoryBoardProps = {
  info: MandalartType & { done_count: number };
};

const categories = ['진행 중인 목표', '완성한 목표'];

export const CategoryBoard = ({ info }: CategoryBoardProps) => {
  const [category, setCategory] = useState<string>('진행 중인 목표');

  /**
   * TODO : fetch해오는 배열로 map하기. (지금은 그냥 임시 array.map() 하는 중)
   *
   * TODO : category에 따라 배열 나누는 기준은 done_count가 64인지 아닌지 배열 순회를 돌려 구분
   */
  return (
    <>
      <div className='relative flex gap-4'>
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={cn(
              'relative px-2 py-2 text-lg text-gray transition-colors hover:text-black',
              category === item && 'text-black'
            )}
          >
            {item}
            <div
              className={cn(
                'absolute -bottom-[1px] left-0 h-[2px] bg-black transition-all duration-300 ease-in-out',
                category === item ? 'w-full opacity-100' : 'w-0 opacity-0'
              )}
            />
          </button>
        ))}
      </div>
      <Spacer size='xl' />
      {category === '진행 중인 목표' ? (
        <div className='grid grid-cols-1 gap-14 sm:grid-cols-2 md:grid-cols-3'>
          {Array.from({ length: 1 }).map((_, index) => {
            const bandColor = getColorWithNumber(index);
            return (
              <MandalartCard key={index} info={info} bandColor={bandColor} />
            );
          })}
        </div>
      ) : (
        <div className='text-gray'>
          <Spacer size='lg' />
          <Text>완료된 만다라트가 없습니다.</Text>
        </div>
      )}
    </>
  );
};
