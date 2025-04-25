/* eslint-disable indent */
'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import MandalartCard from './mandalart-card';
import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import { getColorWithIndexOrder } from '@/shared/utils/get-color-with-index';
import { useGetMandalartCards } from '../hooks/use-get-mandalart-cards';
import { FetchUserRoomsAndParticipantsResponse } from '@/modules/dashboard/types/dashboard-type';

const categories = ['진행 중인 목표', '완성한 목표'];

const MANDALART_MAX_DONE_COUNT = 64;

type CategoryBoardProps = {
  user: string | null;
};

export const CategoryBoard = ({ user }: CategoryBoardProps) => {
  const [category, setCategory] = useState<string>('진행 중인 목표');

  const { data: cards, isPending } = useGetMandalartCards(user);

  const sortedCards = useMemo(() => {
    if (!cards?.data) return [];
    return [...cards.data].sort(
      (
        a: FetchUserRoomsAndParticipantsResponse,
        b: FetchUserRoomsAndParticipantsResponse
      ) =>
        new Date(a.mandalart.createdAt).getTime() -
        new Date(b.mandalart.createdAt).getTime()
    );
  }, [cards]);

  const yetMandalart = cards?.data
    ? sortedCards.filter((room: FetchUserRoomsAndParticipantsResponse) => {
        return room.mandalart.doneCount !== MANDALART_MAX_DONE_COUNT;
      })
    : null;

  const doneMandalart = cards?.data
    ? sortedCards.filter((room: FetchUserRoomsAndParticipantsResponse) => {
        return room.mandalart.doneCount === MANDALART_MAX_DONE_COUNT;
      })
    : null;

  if (isPending)
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
        {/* 스켈레톤 UI */}
        <div className='relative grid w-[1252px] grid-cols-1 place-items-center gap-[40px] md:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className='h-[280px] w-full max-w-[360px] animate-fade-out-left rounded-lg bg-lightgray shadow-[0px_0px_12px_0px_rgba(0,_0,_0,_0.1)]'
            />
          ))}
        </div>
      </>
    );

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
            <div className='grid w-[1252px] animate-fade-in-left grid-cols-1 place-items-center gap-[40px] md:grid-cols-2 lg:grid-cols-3'>
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
              <Text size='18px-medium' textColor='caption'>
                아직은 비어 있지만, 곧 채워질 당신의 여정을 기대할게요 :)
              </Text>
            </div>
          )}
        </div>
      ) : (
        <div className='flex'>
          {doneMandalart && doneMandalart?.length ? (
            <div className='grid w-full max-w-[1252px] animate-fade-in-left grid-cols-1 place-items-center gap-14 md:grid-cols-2 lg:grid-cols-3'>
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
              <Text size='18px-medium' textColor='caption'>
                현재 진행 중인 목표가 없어요. ‘새 만다라트’ 버튼을 눌러 지금
                바로 시작해보세요!
              </Text>
            </div>
          )}
        </div>
      )}
    </>
  );
};
