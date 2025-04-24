import CircularProgress from '@/components/commons/circular-progress';
import Spacer from '@/components/commons/spacer';
import CardButtonDropDown from './card-button-drop-down';
import Link from 'next/link';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import { calculatorProgress } from '@/shared/utils/calculator-progress';
import { FetchUserRoomsAndParticipantsResponse } from '@/modules/dashboard/types/dashboard-type';
import { getDateDiff } from '../util/calculate-date';
import { formatDate } from '../util/format-date';
import { DashboardAvatarStack } from './dashboard-avatar-stack';
import {
  getPastelCodeWithIndex,
  getPigmentCodeWithIndex,
} from '@/shared/utils/get-color-with-index';
import URLS from '@/shared/constants/url-constants';
import { BicepsFlexed } from 'lucide-react';

type MandalartCardProps = {
  card: FetchUserRoomsAndParticipantsResponse;
  bandColor: string;
  index: number;
  user: string | null;
};

const MandalartCard = ({
  card,
  bandColor,
  index,
  user,
}: MandalartCardProps) => {
  const diff = getDateDiff(card.mandalart.endDate);
  return (
    <div
      className={`${bandColor} focus:animate-fade-in-left grid h-fit w-full min-w-[330px] max-w-[394px] rounded-br-lg rounded-tr-lg shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] focus:outline-none`}
    >
      <div className='relative ml-3 rounded-br-lg rounded-tr-lg bg-white-light'>
        <div className='absolute right-0 top-0'>
          <CardButtonDropDown
            user={user}
            mandalartId={card.mandalart.id}
            colorId={card.mandalart.color}
            owner={card.roomOwner}
            roomId={card.roomId}
            startDate={card.mandalart.startDate}
            endDate={card.mandalart.endDate}
          />
        </div>
        <Link href={`${URLS.MANDALART}/${card.roomId}`}>
          <div className='w-full flex-col px-[24px] pb-[22px] pt-[32px]'>
            <div className='flex justify-between'>
              <div className='flex place-items-end gap-[4px] md:gap-[8px]'>
                <Text
                  align='left'
                  size='16px-semibold'
                  textColor={diff < 0 ? 'error' : 'sub'}
                >
                  {diff < 0
                    ? `${Math.abs(diff)}일 지남`
                    : diff === 0
                      ? '오늘까지'
                      : `${diff}일 남음`}
                </Text>
                {card.mandalart.startDate ? (
                  <Text size='14px-regular' textColor='caption'>
                    {`${formatDate(card.mandalart.startDate)} - ${formatDate(card.mandalart.endDate)}`}
                  </Text>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className='flex-col'>
              <div className='flex flex-col gap-[15px]'>
                <div className='flex flex-col gap-y-[7px]'>
                  <Title as='h3' size='24px-semibold'>
                    {card.mandalart.title}
                  </Title>
                  {card.mandalart.subTitle ? (
                    <Text size='16px-medium' textColor='sub'>
                      <span className='flex gap-[4px]'>
                        <BicepsFlexed />
                        {card.mandalart.subTitle}
                      </span>
                    </Text>
                  ) : (
                    <Text size='16px-medium' textColor='sub'>
                      <span className='flex gap-[4px]'>
                        <BicepsFlexed />
                        반드시 완수한다 !!!!!
                      </span>
                    </Text>
                  )}
                </div>
                <DashboardAvatarStack
                  maxAvatarsAmount={3}
                  avatars={card.participants.map((person) => {
                    return {
                      name: person.nickname,
                      image: person.profileUrl,
                    };
                  })}
                />
              </div>
            </div>
            <Spacer size='md' />
            <hr className='w-full' />
            <Spacer size='md' />
            <div className='flex gap-[25px]'>
              <div>
                <CircularProgress
                  size='default'
                  pathColor={getPigmentCodeWithIndex(
                    card.mandalart.color || index
                  )}
                  trailColor={getPastelCodeWithIndex(
                    card.mandalart.color || index
                  )}
                  value={calculatorProgress(card.mandalart.doneCount)}
                />
              </div>
              <div className='flex flex-col place-content-center gap-y-[4px]'>
                <span className='hidden md:block'>
                  <Text size='16px-regular' textColor='sub'>
                    목표에
                  </Text>
                </span>
                <span className='block md:hidden'>
                  <Text size='16px-regular' textColor='sub'>
                    지금까지
                  </Text>
                </span>
                <div className='flex place-items-center gap-[4px]'>
                  <Text size='20px-bold' textColor='sub'>
                    {calculatorProgress(card.mandalart.doneCount)}%
                  </Text>
                  <span className='hidden md:block'>
                    <Text size='16px-regular' textColor='sub'>
                      가까워졌어요 :)
                    </Text>
                  </span>
                  <span className='block md:hidden'>
                    <Text size='16px-regular' textColor='sub'>
                      해냈어요
                    </Text>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MandalartCard;
