'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import { useState } from 'react';
import './calendar-custom.css';

export default function CalendarPage() {
  const [events] = useState([
    {
      title: '우리집에서 학교까지 걷기',
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
      title: '3시에 양서윤님과 유저 테스트',
      date: '2025-04-14',
      backgroundColor: '#f7d6d1',
      borderColor: '#f7d6d1',
      textColor: '#111',
    },
  ]);

  return (
    <div className='min-h-screen p-8'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        locale={koLocale}
        events={events}
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: '',
        }}
        dayMaxEventRows={3}
        fixedWeekCount={false}
        height='auto'
        aspectRatio={1.25}
        showNonCurrentDates={true}
        eventContent={(arg) => (
          <div className='custom-event'>{arg.event.title}</div>
        )}
        dayHeaderFormat={{ weekday: 'narrow' }}
        titleFormat={{ year: 'numeric', month: 'long' }}
        dayCellContent={({ date }) => date.getDate()}
        initialDate={new Date()}
        unselectAuto={true}
      />
    </div>
  );
}
