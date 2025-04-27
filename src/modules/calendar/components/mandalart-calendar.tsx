'use client';

import { useEffect, useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../../styles/calendar-custom.css';
import interactionPlugin from '@fullcalendar/interaction';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import CalendarFloatingSheet from '@/modules/calendar/components/calendar-floating-sheet';
import { MyMandalartsType } from '@/modules/today-list/types/today-list-type';
import { flattenTodos } from '@/modules/today-list/utils/flatten-todos';
import Spacer from '@/components/commons/spacer';
import { getPastelCodeWithIndex } from '@/shared/utils/get-color-with-index';

type MandalartCalendarProps = {
  myMandalarts: MyMandalartsType;
};

/**
 * 캘린더 컴포넌트
 * @param myMandalarts - 내 만다라트 정보
 * @returns
 */
const MandalartCalendar = ({ myMandalarts }: MandalartCalendarProps) => {
  const isVisible = useFloatingSheetStore((state) => state.isVisible);
  const show = useFloatingSheetStore((state) => state.show);
  const setInfo = useFloatingSheetStore((state) => state.setInfo);

  const [headerToolbar, setHeaderToolbar] = useState({
    start: 'today prev,next',
    center: 'title',
    end: '',
  });

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 480) {
      // 모바일 레이아웃
      setHeaderToolbar({
        start: 'today',
        center: 'prev title next',
        end: '',
      });
    } else {
      // 데스크탑 레이아웃
      setHeaderToolbar({
        start: 'today prev,next',
        center: 'title',
        end: '',
      });
    }
  };

  // 전체 평탄화된 투두 리스트 생성
  const flatTodos = useMemo(
    () => (myMandalarts?.length ? myMandalarts.flatMap(flattenTodos) : []),
    [myMandalarts]
  );

  // FullCalendar용 이벤트 리스트 생성
  const events = useMemo(
    () =>
      flatTodos.filter(Boolean).map((todo) => ({
        id: todo.todoId,
        title: todo.todoTitle,
        date: new Date(todo.scheduledDate).toISOString(),
        isDone: todo.isDone,
        color: getPastelCodeWithIndex(todo.color as number),
      })),
    [flatTodos]
  );

  // 셀 클릭 시 날짜 저장 + 플로팅 시트 열기
  const handleCellClick = (dateStr: string) => {
    show();
    if (!isVisible) {
      setInfo(dateStr);
    }
  };

  return (
    <div className='right-0 min-h-screen w-full bg-white-dark'>
      <Spacer size='top' />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        events={events}
        headerToolbar={headerToolbar}
        dayMaxEvents={3}
        fixedWeekCount={false}
        height='auto'
        aspectRatio={1.25}
        showNonCurrentDates={true}
        eventContent={(arg) => (
          <div
            className='custom-event cursor-pointer'
            style={{ backgroundColor: arg.backgroundColor }}
          >
            <span>{arg.event.title}</span>
          </div>
        )}
        dateClick={(arg) => {
          handleCellClick(arg.dateStr);
        }}
        dayCellDidMount={(info) => {
          info.el.addEventListener('click', () => {
            const year = info.date.getFullYear();
            const month = String(info.date.getMonth() + 1).padStart(2, '0');
            const date = String(info.date.getDate()).padStart(2, '0');
            handleCellClick(`${year}-${month}-${date}`);
          });
        }}
        dayHeaderFormat={{ weekday: 'narrow' }}
        titleFormat={{ year: 'numeric', month: 'short' }}
        dayCellContent={({ date }) => date.getDate()}
        initialDate={new Date()}
        unselectAuto={true}
        moreLinkContent={(args) => ({
          html: `<span class="custom-more-link">+${args.num}</span>`,
        })}
        moreLinkDidMount={(info) => {
          info.el.style.pointerEvents = 'none';
        }}
      />
      {isVisible && <CalendarFloatingSheet todos={flatTodos} />}
    </div>
  );
};

export default MandalartCalendar;
