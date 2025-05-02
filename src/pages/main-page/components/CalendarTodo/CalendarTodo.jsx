import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from 'react';
import Modal from '../../../../components/common/Modal';
import styles from '../CalendarTodo/CalendarTodo.module.css';
import ToDo from './ToDo';

const CalendarTodo = ({ setCalendarType }) => {
    const [events, setEvents] = useState([
        { title: '회의', date: '2025-05-02' },
        { title: '공부', date: '2025-05-02' },
        { title: '테스트', date: '2025-05-02' },
      ]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedDate, setSelectedDate] = useState(null);
      let filteredEvents = events.filter((event) => event.date === selectedDate);
    const handleDateClick = (info) => {
        console.log(info);
        setSelectedDate(info.dateStr);
        setIsModalOpen(true);
      };


      
    return (
        <div className='calendarArea'>
            todo
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                dateClick={handleDateClick}
                events={events}
                initialView='dayGridMonth'
                customButtons={{
                    todo: {
                        text: '나의 일정',
                        click: function () {
                            setCalendarType(true);
                        }
                    },
                    diary: {
                        text: '나의 일기',
                        click: function () {
                            setCalendarType(false);
                        }
                    }
                }}
                headerToolbar={{
                    start: 'todo diary',
                    center: 'title',
                    end: 'today prev,next'
                }}
                height={700}
                contentHeight={500}
                handleWindowResize={true}
                locale='ko'
                dayCellContent={(arg) => {
                    return <span>{arg.date.getDate()}</span>
                }}
            />
            {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title={
            selectedDate
      ? `${selectedDate.split("-")[0]}년 ${Number(selectedDate.split("-")[1])}월 ${Number(selectedDate.split("-")[2])}일`
      : ''
          }
          onClose={() => setIsModalOpen(false)}
        >
          <ToDo
            selectedDate={selectedDate}
            filteredEvents={filteredEvents}
          />
          
        </Modal>
      )}
        </div>
    )
}

export default CalendarTodo