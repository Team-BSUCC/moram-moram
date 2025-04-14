'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import { useState } from 'react';
import './calendar-custom.css';
import interactionPlugin from '@fullcalendar/interaction';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import CalendarFloatingSheet from '@/modules/calendar/components/calendar-floating-sheet';

/**
 *@todo : 캘린더 UI 추가 수정
 *@todo : DB 데이터 연동
 *@todo : 어떤식으로 데이터를 가져올지 고민하기
 */
const CalendarPage = () => {
  const isVisible = useFloatingSheetStore((state) => state.isVisible);
  const show = useFloatingSheetStore((state) => state.show);
  const setInfo = useFloatingSheetStore((state) => state.setInfo);

  // 더미 데이터
  const [events] = useState([
    {
      title: '3시에 양서윤님과 유저 테스트',
      date: '2025-04-14',
      backgroundColor: '#f7d6d1',
      borderColor: '#f7d6d1',
      textColor: '#111',
    },
    {
      title: '역행자 P128까지 읽기',
      date: '2025-04-14',
      backgroundColor: '#f7d6d1',
      borderColor: '#f7d6d1',
      textColor: '#111',
    },
    {
      title: '우리집에서 학교까지 걷기',
      date: '2025-04-14',
      backgroundColor: '#f7d6d1',
      borderColor: '#f7d6d1',
      textColor: '#111',
    },
    {
      title: '우리집에서 학교까지 걷기',
      date: '2025-04-14',
      backgroundColor: '#f7d6d1',
      borderColor: '#f7d6d1',
      textColor: '#111',
    },
  ]);

  // 셀 클릭 핸들러
  const handleCellClick = (dateStr: string) => {
    setInfo(dateStr);
    show();
  };

  return (
    <div className='min-h-screen p-8'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        locale={koLocale}
        events={events}
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: '',
        }}
        dayMaxEventRows={5}
        fixedWeekCount={false}
        height='auto'
        aspectRatio={1.25}
        showNonCurrentDates={true}
        eventContent={(arg) => (
          <div className='custom-event'>{arg.event.title}</div>
        )}
        dateClick={(arg) => {
          handleCellClick(arg.dateStr);
        }}
        dayCellDidMount={(info) => {
          // 셀 전체에 클릭 이벤트 리스너 추가
          info.el.addEventListener('click', () => {
            const dateStr = info.date.toISOString().split('T')[0];
            handleCellClick(dateStr);
          });
        }}
        dayHeaderFormat={{ weekday: 'narrow' }}
        titleFormat={{ year: 'numeric', month: 'long' }}
        dayCellContent={({ date }) => date.getDate()}
        initialDate={new Date()}
        unselectAuto={true}
      />
      {isVisible && <CalendarFloatingSheet todos={events} />}
    </div>
  );
};

export default CalendarPage;
