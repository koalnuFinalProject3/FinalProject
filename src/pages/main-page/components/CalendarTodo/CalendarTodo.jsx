import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import Modal from '../../../../components/common/Modal';
import useModal from '../../../../hooks/useModal';
import ToDo from './ToDo';
import addCalendarIcon from '../../../../assets/icons/addCalendar.svg?url';


import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from '../../../../apis/todoApi';
import styles from './CalendarTodo.module.css';
const CalendarTodo = ({ setCalendarType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newTodoContent, setNewTodoContent] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [todos, setTodos] = useState([]);
  const { isOpen, open, close } = useModal();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr); // 날짜 선택 시 selectedDate 상태 업데이트
    setNewTodoContent('');
    open();
  };
  const handleEventClick = (info) => {
    setSelectedDate(info.event.startStr);  // 이벤트의 날짜로 설정
    setSelectedEvent(info.event);  // 클릭한 이벤트 객체 저장
    open();
  };
  const fetchTodos = async () => {
    // state 업데이트용
    try {
      setIsLoading(true);
      const data = await getTodos();
      setTodos(data || []);
    } catch (err) {
      console.log('Failed to fetch todos:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // todos 배열을 이벤트 형식에 맞게 변환
  const events = todos.map((todo) => ({
    title: todo.contents,
    date: todo.selectedDate,
    classNames: todo.endYn
      ? [styles['fc-event-done'], ['event-container']]
      : [styles['fc-event-not-done'], ['event-container']],
  }));

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    // selectedDate가 바뀔 때마다 filteredEvents 업데이트
    if (selectedDate) {
      const updatedFilteredEvents = todos.filter(
        (todo) => todo.selectedDate === selectedDate
      );
      setFilteredEvents(updatedFilteredEvents);
    }
  }, [selectedDate, todos]);

  const handleCloseModal = () => {
    fetchTodos(); // 데이터를 새로 fetch
    close(); // 모달 닫기
  };

  function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodoContent.trim()) return null;

    const newTodo = {
      id: randomIDGenerate(),
      contents: newTodoContent,
      selectedDate: selectedDate,
      endYn: false,
    };

    try {
      setIsLoading(true);
      await createTodo(newTodo);
      await fetchTodos(); // <= 이거 추가
      setNewTodoContent('');
    } catch (err) {
      console.error('Failed to create todo:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      setIsLoading(true);
      await deleteTodo(id);
      await fetchTodos();
    } catch (err) {
      console.error('삭제 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 체크 상태 변경 함수
  const handleCheckChange = async (index) => {
    try {
      const updatedEvent = { ...filteredEvents[index] };
      updatedEvent.endYn = !updatedEvent.endYn;

      // 먼저 로컬 상태를 즉시 업데이트하여 UI에 반영
      const newFiltered = [...filteredEvents];
      newFiltered[index] = updatedEvent;
      setFilteredEvents(newFiltered);

      await updateTodo(updatedEvent.id, updatedEvent);
    } catch (error) {
      console.error('체크 상태 업데이트 실패:', error.message);
    }
  };

  return (
    <div className="calendarArea">
      <FullCalendar
        className={styles.todoCalendar}
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        eventClick={handleEventClick} 
        events={events}
        initialView="dayGridMonth"
        customButtons={{
          todo: {
            text: '나의 일정',
            click: function () {
              setCalendarType(true);
            },
          },
          diary: {
            text: '나의 일기',
            click: function () {
              setCalendarType(false);
            },
          },
        }}
        headerToolbar={{
          start: 'todo diary',
          center: 'title',
          end: 'today prev,next',
        }}
        height={750}
        contentHeight={500}
        handleWindowResize={true}
        locale="ko"
        dayCellContent={(arg) => {
          return <span>{arg.date.getDate()}</span>;
        }}
        dayCellDidMount={(arg) => {
          arg.el.classList.add('dayContainer'); // 원하는 class 추가
        }}
      />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          title={
            selectedDate
              ? `${selectedDate.split('-')[0]}년 ${Number(
                  selectedDate.split('-')[1]
                )}월 ${Number(selectedDate.split('-')[2])}일`
              : ''
          }
          onClose={handleCloseModal}
        >
          <ToDo
            isLoading={isLoading}
            setNewTodoContent={setNewTodoContent}
            newTodoContent={newTodoContent}
            handleAddTodo={handleAddTodo}
            handleDeleteTodo={handleDeleteTodo}
            handleCheckChange={handleCheckChange}
            selectedDate={selectedDate}
            filteredEvents={filteredEvents}
            setFilteredEvents={setFilteredEvents}
          />
        </Modal>
      )}
    </div>
  );
};

export default CalendarTodo;
