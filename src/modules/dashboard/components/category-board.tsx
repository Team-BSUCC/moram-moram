'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import MandalartCard from './mandalart-card';
import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import { getColorWithIndexOrder } from '@/shared/utils/get-color-with-index';
import { useGetMandalartCards } from '../hooks/use-get-mandalart-cards';
import { FetchUserRoomsAndParticipantsResponse } from '@/modules/dashboard/types/dashboard-type';

const categories = ['진행 중인 목표', '완성한 목표'];

type CategoryBoardProps = {
  user: string | null;
};

export const CategoryBoard = ({ user }: CategoryBoardProps) => {
  const [category, setCategory] = useState<string>('진행 중인 목표');

  const { data: cards, isPending } = useGetMandalartCards();

  if (isPending) return <div>Loading</div>;

  const yetMandalart = cards.data
    ? cards.data.filter((room: FetchUserRoomsAndParticipantsResponse) => {
        return room.mandalart.doneCount !== 64;
      })
    : null;

  const doneMandalart = cards.data
    ? cards.data.filter((room: FetchUserRoomsAndParticipantsResponse) => {
        return room.mandalart.doneCount === 64;
      })
    : null;

  console.log('아직', yetMandalart);
  console.log('다 함', doneMandalart);

  return (
    <>
      <div className='relative flex gap-4'>
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={cn(
              'relative px-[2px] py-[10px] text-[20px] font-semibold leading-[28px] text-sub transition-colors hover:text-main sm:text-[22px] sm:leading-[30px] md:text-[24px] md:leading-[32.4px]',
              category === item && 'text-main'
            )}
          >
            {item}
            <div
              className={cn(
                'absolute -bottom-[1px] left-0 h-[2px] bg-main transition-all duration-300 ease-in-out',
                category === item ? 'w-full opacity-100' : 'w-0 opacity-0'
              )}
            />
          </button>
        ))}
      </div>
      <Spacer size='lg' />
      {category === '진행 중인 목표' ? (
        <div className='flex'>
          {yetMandalart && yetMandalart?.length ? (
            <div className='grid w-full max-w-[1252px] grid-cols-1 place-items-center gap-14 md:grid-cols-2 lg:grid-cols-3'>
              {yetMandalart.map(
                (
                  card: FetchUserRoomsAndParticipantsResponse,
                  index: number
                ) => {
                  const bandColor = getColorWithIndexOrder(
                    card.mandalart.color || index
                  );
                  return (
                    <MandalartCard
                      key={index}
                      index={index}
                      card={card}
                      bandColor={bandColor}
                      user={user}
                    />
                  );
                }
              )}
            </div>
          ) : (
            <div className='flex w-full justify-center'>
              <Text size='24px-semibold' textColor='caption'>
                진행 중인 만다라트가 없습니다.
              </Text>
            </div>
          )}
        </div>
      ) : (
        <div className='flex'>
          {doneMandalart && doneMandalart?.length ? (
            <div className='grid w-full max-w-[1252px] grid-cols-1 place-items-center gap-14 md:grid-cols-2 lg:grid-cols-3'>
              {doneMandalart.map(
                (
                  card: FetchUserRoomsAndParticipantsResponse,
                  index: number
                ) => {
                  const bandColor = getColorWithIndexOrder(
                    card.mandalart.color || index
                  );
                  return (
                    <MandalartCard
                      key={index}
                      index={index}
                      card={card}
                      bandColor={bandColor}
                      user={user}
                    />
                  );
                }
              )}
            </div>
          ) : (
            <div className='flex w-full justify-center'>
              <Text size='24px-semibold' textColor='caption'>
                완료된 만다라트가 없습니다.
              </Text>
            </div>
          )}
        </div>
      )}
    </>
  );
};
