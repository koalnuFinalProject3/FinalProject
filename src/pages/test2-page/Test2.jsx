import { useEffect, useState } from 'react';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Modal from '../../components/common/Modal';
import useModal from '../../hooks/useModal';
import { createTodo, getTodos } from '../../apis/todoApi';

export default function Test2() {
  const [todos, setTodos] = useState([]);
  const { isOpen, open, close } = useModal();
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [newTodoContent, setNewTodoContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fetchTodos = async () => {
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

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr); // 날짜 선택 시 selectedDate 상태 업데이트
    setNewTodoContent('');
    open();
  };

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

  return (
    <div className="App" style={{ height: '100vh' }}>
      <h1>My Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} // interaction 플러그인 추가
        initialView="dayGridMonth"
        events={events} // calendar의 events에 표시될 데이터를 전달
        dateClick={handleDateClick} // 날짜 클릭 시 실행될 함수
        height="100%"
        contentHeight="100%"
        aspectRatio={1.5}
      />
      {isOpen && (
        <Modal isOpen={isOpen} onClose={close}>
          <form onSubmit={handleAddTodo}>
            <div>
              <input
                type="text"
                value={newTodoContent}
                onChange={(e) => setNewTodoContent(e.target.value)}
                placeholder="write a todo here"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !newTodoContent.trim()}
              >
                {isLoading ? 'Adding...' : 'Add Task'}
              </button>
            </div>
          </form>
          <div>
            <p>today: {selectedDate}</p>
            <p>todo:</p>
            {filteredEvents && filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <p key={index}>{event.contents}</p>
              ))
            ) : (
              <span>No events for this day</span>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
