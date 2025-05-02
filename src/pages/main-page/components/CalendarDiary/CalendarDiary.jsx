import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import Modal from '../../../../components/common/Modal';
import './DiaryModal.style.css';
import CalendarDiaryModal from './CalendarDiaryModal/CalendarDiaryModal';
import styles from './CalendarDiary.module.css'
// 감정 이모지
import sad from '../../../../assets/images/sadChar.png';
import soso from '../../../../assets/images/sosoChar.png';
import happy from '../../../../assets/images/joyChar.png';
import joy from '../../../../assets/images/happyChar.png';


const CalendarDiary = ({ setCalendarType }) => {

  const [events, setEvents] = useState([
    { title: '회의', date: '2025-05-02', context: '회의 내용입니다.' ,emotion: '0'},
    { title: '테스트', date: '2025-05-10', context: '회의 내용입니다.',emoion: '0' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const filteredEvents = events.filter((event) => event.date === selectedDate);

  const handleDateClick = (info) => {
    console.log(info);
    setSelectedDate(info.dateStr);
    setIsModalOpen(true);
  };


  useEffect(() => {
    const draggableEl = document.getElementById('external-events');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.emotionStick',
        eventData: function (eventEl) {
          console.log(eventEl);
          return {
            image: eventEl.src,
            id: eventEl.dataset.id,
          };
        }
      });
    }
  }, []);


  // 드랍시 발생 이벤트!
  const handleDrop = (info) => {
    console.log(info.draggedEl.getAttribute('data-id')); // 날짜 문자열 반환
    console.log(info.dateStr);

    const dropDateData = events.filter((event) => event.date === info.dateStr);
    let copyEvents = events;
    console.log('복사한 배열',copyEvents)
    // const copyEventsList = events.filter((event) =>event.date === info.dateStr);
    // 일기가 작성되어 있는 경우
    if(dropDateData.length > 0){
      // 삭제!
      copyEvents =events.filter((event) => event.date !== info.dateStr);
      console.log(copyEvents);
      setEvents(copyEvents);
      console.log('제거완료',events)

      // 이모지 추가
      dropDateData[0].emotion = info.draggedEl.getAttribute('data-id');
      console.log(dropDateData[0]);
      setEvents([...events, ...dropDateData])
      console.log("이모지 추가", events);
    }else{
      
    }
    // console.log(2,dropDateData )
  };

  /* 날짜에 보여지는 것 */
  function renderEventContent(eventInfo) {
    const { title, context, image } = eventInfo.event.extendedProps;
    console.log('asdf', title);
    return (
      <div className={styles.dateArea}>
        {title && <div className={styles.title}>{title}</div>}
        {image &&
        <div className={styles.emotionItem}>
          <img src={image} alt="이모지" style={{ width: '30px', height: '30px' }} /> {/* 이모지 이미지 표시 */}
        </div>
        }
      </div>
    )
  }


  return (
    <div className='calendarArea'>
      {/* 이모티콘 영역 */}
      <div id="external-events" className={styles.emotionArea}>
        <div className={styles.emotionSlide} >
          <img className={`${styles.emotionStick} emotionStick`} data-id="1" src={sad} />
          <img className={`${styles.emotionStick} emotionStick`} data-id="2" src={happy} />
          <img className={`${styles.emotionStick} emotionStick`} data-id="3" src={soso} />
          <img className={`${styles.emotionStick} emotionStick`} data-id="4" src={joy} />
          <img className={`${styles.emotionStick} emotionStick`} data-id="5" src={happy} />
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        events={events}
        dateClick={handleDateClick}
        droppable={true}
        drop={handleDrop}
        // eventContent={renderEventContent}
        /* －－－－－－－－－－－－－－ */
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
          end: ''
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
          title="하루 일기"
          onClose={() => setIsModalOpen(false)}
        >
          <CalendarDiaryModal
            filteredEvents={filteredEvents}
            selectedDate={selectedDate}
          />
        </Modal>
      )}
    </div>
  )
}

export default CalendarDiary