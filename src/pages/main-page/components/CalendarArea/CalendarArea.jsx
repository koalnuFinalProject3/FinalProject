import React, {useState} from 'react'
import CalendarTodo from '../CalendarTodo/CalendarTodo';
import CalendarDiary from '../CalendarDiary/CalendarDiary';
import '../CalendarArea/CalendarArea.style.css'


const CalendarArea = () => {
    const [calendarType, setCalendarType] = useState(true); 
    
  return (
    <div>
        {calendarType?(
            <CalendarTodo  setCalendarType={setCalendarType}/>
        ):(
            <CalendarDiary  setCalendarType={setCalendarType}/>
        )}
    </div>
  )
}

export default CalendarArea