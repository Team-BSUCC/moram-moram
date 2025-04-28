'use client';

import Button from '@/components/commons/button';
import { EllipsisVertical, X } from 'lucide-react';
import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { useDeleteRoom } from '../hooks/use-delete-room';
import Title from '@/components/commons/title';
import Text from '@/components/commons/text';
import { useUpdateRoomColor } from '../hooks/use-update-room-color';
import ColorPicker from './color-picker';
import { confirmAlert, infoAlert } from '@/shared/utils/sweet-alert';
import { DateRangeState } from '../types/dashboard-type';
import DateUnitSelect from './date-unit-select';
import { useDateOptionList } from '../hooks/use-date-option-list';
import { getDateToString } from '../util/calculate-date';
import { useRoomDateUpdate } from '../hooks/use-room-date-update';
import { useGetOutRoom } from '../hooks/use-get-out-room';

type CardButtonDropDownProps = {
  roomId: string;
  mandalartId: string;
  colorId: number;
  owner: string;
  user: string | null;
  startDate: Date;
  endDate: Date;
};

const CardButtonDropDown = ({
  roomId,
  mandalartId,
  colorId,
  owner,
  user,
  startDate,
  endDate,
}: CardButtonDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUpdateColorOpen, setIsUpdateColorOpen] = useState(false);
  const [isUpdateDateOpen, setIsUpdateDateOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative inline-block h-[48px] w-[48px]' ref={dropdownRef}>
      <div
        className='relative bottom-0 left-0 h-[48px] w-[48px] cursor-pointer'
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <button className='absolute bottom-0 left-2'>
          <EllipsisVertical size={24} />
        </button>
      </div>

      {isOpen && (
        <div className='absolute right-0 z-10 w-[154px] space-y-2 overflow-hidden rounded-lg border border-lightgray bg-white-light shadow-md'>
          <div className='flex-col'>
            <UpdateDateModal
              isUpdateOpen={isUpdateDateOpen}
              setIsUpdateOpen={setIsUpdateDateOpen}
              mandalartId={mandalartId}
              setIsOpen={setIsOpen}
              startDate={startDate}
              endDate={endDate}
            />
            <UpdateColorModal
              isUpdateOpen={isUpdateColorOpen}
              setIsUpdateOpen={setIsUpdateColorOpen}
              mandalartId={mandalartId}
              setIsOpen={setIsOpen}
              colorId={colorId}
            />
            <DeleteModal
              user={user}
              setIsOpen={setIsOpen}
              isDeleteOpen={isDeleteOpen}
              setIsDeleteOpen={setIsDeleteOpen}
              roomId={roomId}
              owner={owner}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardButtonDropDown;

type DeleteModalProps = {
  isDeleteOpen: boolean;
  setIsDeleteOpen: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  roomId: string;
  owner: string;
  user: string | null;
};

const DeleteModal = ({
  isDeleteOpen,
  setIsDeleteOpen,
  roomId,
  setIsOpen,
  owner,
  user,
}: DeleteModalProps) => {
  const { mutate: deleteRoom } = useDeleteRoom();
  const { mutate: getOutRoom } = useGetOutRoom();

  const handleDeleteRoom = (id: string) => {
    if (owner !== user)
      return confirmAlert(
        '만다라트의 주인이 아닙니다.',
        '방을 나가시겠습니까?'
      ).then((result) => {
        if (result) {
          getOutRoom({
            roomId: id,
            userId: user as string,
          });
          setIsDeleteOpen(false);
          setIsOpen(false);
        } else {
          setIsDeleteOpen(false);
        }
      });
    confirmAlert(
      '정말 삭제하시겠습니까?',
      '삭제한 내용은 되돌릴 수 없습니다.'
    ).then((result) => {
      if (result) {
        deleteRoom(id);
        setIsDeleteOpen(false);
        setIsOpen(false);
      } else {
        setIsDeleteOpen(false);
      }
    });
  };

  return (
    <div>
      <Button
        variant='none'
        size='none'
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsDeleteOpen(true);
        }}
      >
        삭제하기
      </Button>

      {/* 모달 */}
      {isDeleteOpen && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsDeleteOpen(false);
          }}
          className='fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)]'
        >
          <div className='w-[313px] rounded-lg bg-white-light shadow-xl'>
            {/* 닫기 */}
            <div className='flex justify-end'>
              <button
                className='absolute h-[48px] w-[48px] place-items-center'
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsDeleteOpen(false);
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* 내용 */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className='mx-[24px] flex flex-col justify-center gap-y-[20px] text-center'
            >
              <div className='flex flex-col place-items-center gap-y-[12px] pt-[28px]'>
                <Title size='24px-semibold' as='h3' textColor='main'>
                  정말 삭제할까요?
                </Title>
                <Text size='20px-medium' textColor='sub'>
                  삭제한 내용은 되돌릴 수 없어요.
                </Text>
              </div>

              {/* 버튼들 */}
              <div className='flex justify-center gap-[12px] pb-[24px]'>
                <Button
                  variant='outline'
                  size='small'
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setIsDeleteOpen(false);
                  }}
                >
                  취소하기
                </Button>
                <Button
                  size='small'
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDeleteRoom(roomId);
                  }}
                >
                  삭제하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

type UpdateColorModalProps = {
  isUpdateOpen: boolean;
  setIsUpdateOpen: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  mandalartId: string;
  colorId: number;
};

const UpdateColorModal = ({
  isUpdateOpen,
  setIsUpdateOpen,
  mandalartId,
  setIsOpen,
  colorId,
}: UpdateColorModalProps) => {
  const { mutate: updateRoom } = useUpdateRoomColor();
  const [selectedColor, setSelectedColor] = useState<number>(colorId);

  const handleUpdateRoomColor = (mandalartId: string) => {
    if (selectedColor === colorId) return infoAlert('색상의 변화가 없는데요?');
    updateRoom({ mandalartId: mandalartId, colorId: selectedColor });
    setIsUpdateOpen(false);
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        variant='none'
        size='none'
        onClick={() => {
          setIsUpdateOpen(true);
        }}
      >
        색상 변경하기
      </Button>

      {/* 모달 */}
      {isUpdateOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)]'
          onClick={() => {
            setIsUpdateOpen(false);
          }}
        >
          <div className='w-fit rounded-lg bg-white-light shadow-xl'>
            {/* 닫기 */}
            <div className='flex justify-end'>
              <button
                className='absolute h-[48px] w-[48px] place-items-center'
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsUpdateOpen(false);
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* 내용 */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className='flex flex-col place-items-center justify-center px-[24px] pt-[28px] text-center'
            >
              <Title size='24px-semibold' textColor='main' as='h3'>
                변경할 색상을 선택해주세요.
              </Title>
              <div
                className='flex flex-col place-items-center pt-[16px]'
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <ColorPicker
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
              </div>

              {/* 버튼들 */}
              <div className='flex w-full justify-center gap-[12px] py-[24px]'>
                <button
                  className='h-[58px] w-full rounded-lg bg-primary text-[14px] font-medium leading-[20px] transition-colors ease-in-out hover:bg-[#BF93E1] active:bg-[#A76BD6] sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[27px]'
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleUpdateRoomColor(mandalartId);
                  }}
                >
                  선택하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

type UpdateDateModalProps = {
  isUpdateOpen: boolean;
  setIsUpdateOpen: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  mandalartId: string;
  startDate: Date;
  endDate: Date;
};

const UpdateDateModal = ({
  isUpdateOpen,
  setIsUpdateOpen,
  mandalartId,
  setIsOpen,
  endDate,
}: UpdateDateModalProps) => {
  const { mutate: updateDate } = useRoomDateUpdate();

  const formatedEndDate = getDateToString(endDate);

  const [selectedDate, setSelectedDate] = useState<DateRangeState>({
    startYear: '',
    startMonth: '',
    startDay: '',
    endYear: formatedEndDate.yyyy,
    endMonth: formatedEndDate.mm,
    endDay: formatedEndDate.dd,
  });

  const {
    yearList: endYearList,
    monthList: endMonthList,
    dayList: endDayList,
  } = useDateOptionList('yes', selectedDate.endYear, selectedDate.endMonth);

  const handleUpdateRoomColor = (mandalartId: string) => {
    if (
      `${selectedDate.endYear}-${selectedDate.endMonth}-${selectedDate.endDay}` ===
      `${formatedEndDate.yyyy}-${formatedEndDate.mm}-${formatedEndDate.dd}`
    ) {
      return infoAlert('날짜의 변화가 없는데요?');
    }
    updateDate({
      mandalartId: mandalartId,
      endDate: `${selectedDate.endYear}-${selectedDate.endMonth}-${selectedDate.endDay}`,
    });
    setIsUpdateOpen(false);
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        variant='none'
        size='none'
        onClick={() => {
          setIsUpdateOpen(true);
        }}
      >
        날짜 변경하기
      </Button>

      {/* 모달 */}
      {isUpdateOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)]'
          onClick={() => {
            setIsUpdateOpen(false);
          }}
        >
          <div className='w-[347px] rounded-lg bg-white-light shadow-xl'>
            {/* 닫기 */}
            <div className='flex justify-end'>
              <button
                className='absolute h-[48px] w-[48px] place-items-center'
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsUpdateOpen(false);
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* 내용 */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className='flex flex-col place-items-center justify-center gap-y-4 px-[24px] pt-[28px] text-center'
            >
              <div className='flex w-full flex-col gap-[16px]'>
                <Title as='h5' size='20px-medium' weight='semi'>
                  변경 종료일
                </Title>
                <div className='flex gap-[16px]'>
                  <DateUnitSelect
                    unit='Year'
                    target='end'
                    value={selectedDate.endYear}
                    optionList={endYearList}
                    handleChangeDate={setSelectedDate}
                  />
                  <DateUnitSelect
                    unit='Month'
                    target='end'
                    value={selectedDate.endMonth}
                    optionList={endMonthList}
                    handleChangeDate={setSelectedDate}
                  />
                  <DateUnitSelect
                    unit='Day'
                    target='end'
                    value={selectedDate.endDay}
                    optionList={endDayList}
                    handleChangeDate={setSelectedDate}
                  />
                </div>
              </div>

              {/* 버튼들 */}
              <div className='flex w-full justify-center gap-[12px] py-[24px]'>
                <button
                  className='h-[58px] w-full rounded-lg bg-primary text-[14px] font-medium leading-[20px] transition-colors ease-in-out hover:bg-[#BF93E1] active:bg-[#A76BD6] sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[27px]'
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleUpdateRoomColor(mandalartId);
                  }}
                >
                  선택하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
