import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import Modal from '../../../../components/common/Modal';
import useModal from '../../../../hooks/useModal';
import styles from '../CalendarTodo/CalendarTodo.module.css';
import ToDo from './ToDo';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../../../../apis/todoApi';

const CalendarTodo = ({ setCalendarType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newTodoContent, setNewTodoContent] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [todos, setTodos] = useState([]);
  const { isOpen, open, close } = useModal();
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr); // 날짜 선택 시 selectedDate 상태 업데이트
    setNewTodoContent('');
    open();
  };
  const fetchTodos = async () => { // state 업데이트용
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

  // todos 배열을 이벤트 형식에 맞게 변환
  const events = todos.map((todo) => ({
    title: todo.contents,
    date: todo.selectedDate,
  }));

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodoContent.trim()) return null;

    const newTodo = {
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

  const handleDeleteTodo = (id) => {
    const newTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(newTodoList);
  };

    // 체크 상태 변경 함수
  const handleCheckChange = async(index) => {
    const updatedEvent = { ...filteredEvents[index] };
      updatedEvent.endYn = !updatedEvent.endYn;
    
    try {
        await updateTodo(updatedEvent.id, { endYn: updatedEvent.endYn });
        const newFiltered = [...filteredEvents];
        newFiltered[index] = updatedEvent;
        setFilteredEvents(newFiltered);
        fetchTodos(); // 최신 상태 반영
    } catch (error) {
        console.error('체크 상태 업데이트 실패:', error.message);
    }
  };

  return (
    <div className="calendarArea">
      todo
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
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
        height={700}
        contentHeight={500}
        handleWindowResize={true}
        locale="ko"
        dayCellContent={(arg) => {
          return <span>{arg.date.getDate()}</span>;
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
          onClose={close}
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
