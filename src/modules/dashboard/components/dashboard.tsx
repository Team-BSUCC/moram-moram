'use client';
import Button from '@/components/commons/button';
import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import { CategoryBoard } from './category-board';
import { useState } from 'react';
import Input from '@/components/commons/input';
import CreateMandalartModal from './create-mandalart-modal';
import CalendarDropDown from './calendar-drop-down';
import { DateRangeState } from '../types/dashboard-type';
import { SquarePlus, X } from 'lucide-react';
import ColorPicker from './color-picker';
import { useCreateRoom } from '../hooks/use-create-room';
import { useQueryClient } from '@tanstack/react-query';

type DashBoardProps = {
  user: string | null;
};

const DashBoard = ({ user }: DashBoardProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isDateDropDownOpen, setIsDateDropDownOpen] = useState<boolean>(false);
  const [date, setDate] = useState<DateRangeState>({
    startYear: '',
    startMonth: '',
    startDay: '',
    endYear: '',
    endMonth: '',
    endDay: '',
  });
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<number>(0);

  const isStartBig =
    new Date(
      Number(date.startYear),
      Number(date.startMonth) - 1,
      Number(date.startDay)
    ) <=
    new Date(
      Number(date.endYear),
      Number(date.endMonth) - 1,
      Number(date.endDay)
    );
  const queryclient = useQueryClient();

  const { mutate: createRoom, error } = useCreateRoom();

  const isDisable = Object.values(date).every((value) => value !== '');

  const handleCreateMandalart = () => {
    if (error) return alert(error);
    if (!user) return alert('유저 없음');
    if (!title) return alert('제목을 꼭 입력해주세요');
    if (!isStartBig) return alert('시작일보다 종료일이 더 커요!');
    createRoom(
      {
        userId: user,
        title: title,
        color: selectedColor,
        subTitle: subTitle,
        startDate: `${date.startYear}.${date.startMonth}.${date.startDay}`,
        endDate: `${date.endYear}.${date.endMonth}.${date.endDay}`,
      },
      {
        onSuccess: () => {
          alert('생성 완료');
          setIsCreateModalOpen(false);
          setIsDateDropDownOpen(false);
          setDate({
            startYear: '',
            startMonth: '',
            startDay: '',
            endYear: '',
            endMonth: '',
            endDay: '',
          });
          setTitle('');
          setSubTitle('');
          setSelectedColor(0);
          queryclient.invalidateQueries({ queryKey: ['mandalarts-cards'] });
        },
        onError: (err) => {
          alert('생성 중 오류 발생: ' + err.message);
        },
      }
    );
  };

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
            <button
              className='fixed bottom-[64px] right-[26px] z-50 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-beige-light shadow-xl hover:bg-[#DDCEC5] active:bg-[#CBB2A4] sm:hidden'
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsCreateModalOpen(true);
              }}
            >
              <SquarePlus size={24} />
            </button>

            <div className='hidden self-center sm:block'>
              <Button
                variant='secondary'
                size='medium'
                onClick={() => setIsCreateModalOpen(true)}
              >
                + 새 만다라트
              </Button>
              <CreateMandalartModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
              >
                <div className='fixed w-full max-w-sm sm:max-w-[525px]'>
                  <X
                    className='mr-[16px] mt-[16px] cursor-pointer place-self-end'
                    onClick={() => setIsCreateModalOpen(false)}
                    size={32}
                  />
                </div>
                <div className='px-[32px] pt-[36px]'>
                  <div>
                    <Input
                      value={title}
                      sizes='24px-semibold'
                      placeholder='핵심 목표를 작성해주세요.'
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div className='flex items-center gap-[8px] pt-[8px]'>
                    <Calendar />
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setIsDateDropDownOpen((prev) => !prev);
                      }}
                      className='flex items-center'
                    >
                      <Text textColor='caption' size='20px-medium'>
                        {Object.values(date).every((value) => value !== '')
                          ? `${date.startYear}.${date.startMonth}.${date.startDay} ~ ${date.endYear}.${date.endMonth}.${date.endDay}`
                          : '기간 설정'}
                      </Text>
                      <CalendarDropDown
                        date={date}
                        isOpen={isDateDropDownOpen}
                        setIsOpen={setIsDateDropDownOpen}
                        handleChangeDate={setDate}
                      />
                    </div>
                  </div>
                  <div className='flex w-fit place-items-center gap-[10px] placeholder:text-caption'>
                    <MuscleArms />
                    <Input
                      value={subTitle}
                      variant='none'
                      onChange={(e) => {
                        setSubTitle(e.target.value);
                      }}
                      sizes='20px-medium'
                      placeholder='목표 문구를 작성해주세요.'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex w-full justify-center pt-[28px]'>
                      <ColorPicker
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                      />
                    </div>
                    <div className='flex w-full flex-col pt-[19px]'>
                      <Text
                        size='18px-medium'
                        align='center'
                        textColor='caption'
                      >
                        해당 만다라트에 대한 색을 설정해주세요.
                      </Text>
                      <Text
                        size='18px-medium'
                        align='center'
                        textColor='caption'
                      >
                        내 만다라트 컬렉션과 달력에서 해당 색상으로 보여요 :)
                      </Text>
                    </div>

                    <div className='flex w-full justify-center pt-[8px] transition-all sm:pt-[16px] md:pt-[24px]'>
                      <button
                        className='mx-[28px] h-[51px] w-full rounded-lg bg-primary text-[14px] font-medium leading-[20px] hover:bg-[#BF93E1] active:bg-[#A76BD6] disabled:pointer-events-none disabled:border-none disabled:bg-[#E6E6E6] disabled:text-caption sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[27px]'
                        disabled={!isDisable}
                        onClick={() => {
                          handleCreateMandalart();
                        }}
                      >
                        생성하기
                      </button>
                    </div>
                  </div>
                </div>
              </CreateMandalartModal>
            </div>
          </div>
          <Spacer size='lg' />

          {/* 내 만다라트 영역 */}
          <CategoryBoard user={user} />
        </div>
      </div>
      <div className='h-[106px] w-full' />
    </>
  );
};

export default DashBoard;

const Calendar = () => {
  return (
    <div>
      <svg
        width='30'
        height='30'
        viewBox='0 0 30 30'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M8.74933 13.75H11.2493V16.25H8.74933V13.75ZM8.74933 18.75H11.2493V21.25H8.74933V18.75ZM13.7493 13.75H16.2493V16.25H13.7493V13.75ZM13.7493 18.75H16.2493V21.25H13.7493V18.75ZM18.7493 13.75H21.2493V16.25H18.7493V13.75ZM18.7493 18.75H21.2493V21.25H18.7493V18.75Z'
          fill='#767676'
        />
        <path
          d='M6.25 27.5H23.75C25.1287 27.5 26.25 26.3787 26.25 25V7.5C26.25 6.12125 25.1287 5 23.75 5H21.25V2.5H18.75V5H11.25V2.5H8.75V5H6.25C4.87125 5 3.75 6.12125 3.75 7.5V25C3.75 26.3787 4.87125 27.5 6.25 27.5ZM23.75 10L23.7512 25H6.25V10H23.75Z'
          fill='#767676'
        />
      </svg>
    </div>
  );
};

const MuscleArms = () => {
  return (
    <svg
      width='30'
      height='30'
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.5752 21.5052C14.3606 18.6615 17.1069 16.6302 20.2702 16.966C23.2819 17.2856 25.676 19.826 25.8277 22.8485C25.8656 23.6448 25.7573 24.4085 25.5244 25.1181C25.3835 25.5515 24.961 25.8385 24.5006 25.8385H8.36869C5.63436 25.8385 3.58361 23.3366 4.11986 20.6553L7.41644 4.17188H13.9164L16.0831 7.96354L11.441 11.284L10.1248 9.58854M11.4464 11.284L13.9164 20.4219'
        stroke='#767676'
        strokeWidth='2.16667'
        strokeMiterlimit='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
