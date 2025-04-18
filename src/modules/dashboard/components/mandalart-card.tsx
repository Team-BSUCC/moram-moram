import CircularProgress from '@/components/commons/circular-progress';
import Spacer from '@/components/commons/spacer';
import CardButtonDropDown from './card-button-drop-down';
import Link from 'next/link';
import { Avatar } from '@/components/ui/avatar';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import { calculatorProgress } from '@/shared/utils/calculator-progress';
import { formatDate } from '@/shared/utils/format-date';
import { MandalartType } from '@/modules/mandalart/types/realtime-type';

type MandalartCardProps = {
  info: MandalartType & { done_count: number };
  bandColor: string;
};

const MandalartCard = ({ info, bandColor }: MandalartCardProps) => {
  /**
   * TODO : Link 태그 href 내부 링크 수정 (room/uuid)
   */
  return (
    <div
      className={`${bandColor} grid w-full rounded-br-lg rounded-tr-lg shadow-md`}
    >
      <Link href='/mandalart'>
        <div className='ml-3 rounded-br-lg rounded-tr-lg bg-white-light'>
          <div className='w-full flex-col p-3'>
            <div className='flex justify-between'>
              <div className='flex gap-2'>
                <Text align='left'>365일 남음</Text>
                <span className='mb-[1px] self-end text-ss text-gray'>
                  {formatDate(info.created_at)}
                </span>
              </div>
              <CardButtonDropDown />
            </div>
            <div className='flex-col'>
              <Title as='h4'>{info.title}</Title>
              <p>완수한다!</p>
              <Avatar />
            </div>
            <Spacer size='sm' />
            <hr className='w-full' />
            <Spacer size='sm' />
            <div className='flex gap-3'>
              <div>
                <CircularProgress
                  value={calculatorProgress(info.done_count)}
                  size='sm'
                />
              </div>
              <div className='flex-col place-content-center'>
                <p>지금까지</p>
                <p>{calculatorProgress(info.done_count)}% 해냈어요</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MandalartCard;
