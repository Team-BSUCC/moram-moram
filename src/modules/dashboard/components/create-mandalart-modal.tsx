'use client';

import { BicepsFlexed, CalendarDays, X } from 'lucide-react';
import Input from '@/components/commons/input';
import Text from '@/components/commons/text';
import ColorPicker from './color-picker';
import CalendarDropDown from './calendar-drop-down';
import { ChangeEvent, useRef, useState } from 'react';
import { useMandalartForm } from '../hooks/use-mandalart-form';
import { useMandalartCreator } from '../hooks/use-mandalart-creator';
import { getPastelCodeWithIndex } from '@/shared/utils/get-color-with-index';
import ModalPortal from '@/components/commons/modal-portal';

const CreateMandalartModal = ({
  user,
  isOpen,
  handleClose,
}: {
  user: string | null;
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const {
    title,
    setTitle,
    subTitle,
    setSubTitle,
    date,
    setDate,
    selectedColor,
    setSelectedColor,
    isDateValid,
    isFilled,
    resetForm,
  } = useMandalartForm();

  const { create } = useMandalartCreator(user, () => {
    resetForm();
    handleClose();
  });

  const [isDateDropDownOpen, setIsDateDropDownOpen] = useState(false);

  const submittingRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    if (submittingRef.current) return;

    submittingRef.current = true;
    setIsSubmitting(true);
    try {
      await create({ title, subTitle, selectedColor, date });
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const charLimit = 15;
  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length - 1 === charLimit) return;
    setTitle(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className='fixed z-50 w-full max-w-[525px] shadow-lg'>
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)]'
          onClick={handleClose}
        >
          <div
            className='relative h-[357px] w-full max-w-sm rounded-br-lg rounded-tr-lg border-l-[10px] bg-white shadow-lg outline-red-pastel sm:h-[380px] sm:max-w-[535px] md:h-[408px]'
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: getPastelCodeWithIndex(selectedColor) }}
          >
            <div
              onClick={handleClose}
              className='relative h-[48px] w-[48px] cursor-pointer place-self-end'
            >
              <X className='absolute bottom-0 left-0' size={32} />
            </div>
            <div className='px-8'>
              {/* 제목 입력 */}
              <div className='relative'>
                <Input
                  maxLength={15}
                  value={title}
                  sizes='24px-semibold'
                  placeholder='핵심 목표를 작성해주세요.'
                  onChange={handleInputValueChange}
                />
                <span className='absolute right-8 top-[10px] text-sub'>{`${title.length}/${charLimit}`}</span>
              </div>

              {/* 날짜 선택 */}
              <div className='flex flex-col gap-y-[7px]'>
                <div className='relative flex items-center gap-2 pt-2'>
                  <CalendarDays />
                  <div
                    className='cursor-pointer'
                    onClick={() => setIsDateDropDownOpen((prev) => !prev)}
                  >
                    <Text size='20px-medium' textColor='caption'>
                      {Object.values(date).every((v) => v !== '')
                        ? `${date.startYear}.${date.startMonth}.${date.startDay} ~ ${date.endYear}.${date.endMonth}.${date.endDay}`
                        : '기간 설정'}
                    </Text>
                  </div>

                  {/* 드롭다운 렌더 */}
                  <CalendarDropDown
                    isOpen={isDateDropDownOpen}
                    onClose={() => setIsDateDropDownOpen(false)}
                    setDate={setDate}
                    date={date}
                  />
                </div>

                {/* 서브 제목 */}
                <div className='flex items-center gap-2'>
                  <BicepsFlexed />
                  <input
                    className='text-[16px] font-medium leading-[24px] text-caption outline-none sm:text-[18px] sm:leading-[27px] md:text-[20px] md:leading-[30px]'
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    placeholder='목표 문구를 작성해주세요.'
                  />
                </div>
              </div>

              {/* 색상 선택 */}
              <div className='flex flex-col'>
                <div className='sm:pt[20px] flex w-full justify-center pt-[14px] md:pt-[24px]'>
                  <ColorPicker
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                  />
                </div>
                <div className='flex w-full flex-col pt-[19px]'>
                  <Text size='16px-medium' align='center' textColor='caption'>
                    해당 만다라트에 대한 색을 설정해주세요.
                  </Text>
                  <Text size='16px-medium' align='center' textColor='caption'>
                    내 만다라트 컬렉션과 달력에서 해당 색상으로 보여요 :)
                  </Text>
                </div>

                <div className='flex w-full justify-center pt-[8px] sm:pt-[16px] md:pt-[24px]'>
                  <button
                    className='mx-[28px] h-[51px] w-full select-none rounded-lg bg-primary text-[14px] font-medium leading-[20px] transition-colors ease-in-out hover:bg-[#BF93E1] active:bg-[#A76BD6] disabled:pointer-events-none disabled:border-none disabled:bg-[#E6E6E6] disabled:text-caption sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[27px]'
                    disabled={!isFilled || !isDateValid() || isSubmitting}
                    onClick={handleCreate}
                  >
                    {isSubmitting
                      ? '생성 중...'
                      : !isFilled
                        ? '제목과 날짜를 입력해주세요!'
                        : !isDateValid()
                          ? '시작일과 종료일을 확인해주세요!'
                          : '생성하기'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default CreateMandalartModal;
