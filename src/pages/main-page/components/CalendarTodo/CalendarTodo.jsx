import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const CalendarTodo = ({ setCalendarType }) => {
    return (
        <div className='calendarArea'>
            todo
            <FullCalendar
                plugins={[dayGridPlugin]}
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
        </div>
    )
}

export default CalendarTodo