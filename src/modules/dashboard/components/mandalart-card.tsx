import CircularProgress from '@/components/commons/circular-progress';
import Spacer from '@/components/commons/spacer';
import CardButtonDropDown from './card-button-drop-down';
import Link from 'next/link';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import { calculatorProgress } from '@/shared/utils/calculator-progress';
import { FetchUserRoomsAndParticipantsResponse } from '@/modules/dashboard/types/dashboard-type';
import { getDateDiff } from '../util/calculate-date-differents';
import { formatDate } from '../util/format-date';
import { DashboardAvatarStack } from './dashboard-avatar-stack';
import {
  getPastelCodeWithIndex,
  getPigmentCodeWithIndex,
} from '@/shared/utils/get-color-with-index';
import URLS from '@/shared/constants/url-constants';

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
      className={`${bandColor} grid h-fit w-full min-w-[330px] max-w-[394px] rounded-br-lg rounded-tr-lg shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)]`}
    >
      <div className='relative ml-3 rounded-br-lg rounded-tr-lg bg-white-light'>
        <div className='absolute right-[10px] top-[20px]'>
          <CardButtonDropDown
            user={user}
            mandalartId={card.mandalart.id}
            colorId={card.mandalart.color}
            owner={card.roomOwner}
            roomId={card.roomId}
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
                        <MuscleArm />
                        {card.mandalart.subTitle}
                      </span>
                    </Text>
                  ) : (
                    <Text size='16px-medium' textColor='sub'>
                      <span className='flex gap-[4px]'>
                        <MuscleArm />
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

const MuscleArm = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8.90462 14.9974C9.50879 12.8099 11.6213 11.2474 14.0546 11.5057C16.3713 11.7516 18.213 13.7057 18.3296 16.0307C18.3588 16.6432 18.2755 17.2307 18.0963 17.7766C17.988 18.1099 17.663 18.3307 17.3088 18.3307H4.89962C2.79629 18.3307 1.21879 16.4061 1.63129 14.3436L4.16712 1.66406H9.16712L10.8338 4.58073L7.26296 7.1349L6.25046 5.83073M7.26712 7.1349L9.16712 14.1641'
        stroke='#5E5E5E'
        strokeWidth='1.66667'
        strokeMiterlimit='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
