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
import axios from 'axios';
import useDiaryStore from '../../../../stores/useDiaryStore';


const CalendarDiary = ({ setCalendarType }) => {

  //일기
  const { diary, setDiary, emotions, setEmotions } = useDiaryStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [diaryObj, setDiaryobj] = useState({});
  // json 데이터 가져오기
  //로컬: http://localhost:5000/diary
  // git: https://my-json-server.typicode.com/koalnuFinalProject3/FinalProject/diary
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:5000/diary'),
      axios.get('http://localhost:5000/emotion')
    ])
      .then(([diaryRes, emotionRes]) => {
        setDiary(diaryRes.data);
        setEmotions(emotionRes.data);
        console.log(diary);
        console.log(emotions);
      })
      .catch(error => {
        console.error('데이터 가져오기 실패:', error);
      });
  }, [isModalOpen]);

  /* ----------------------------------------------------------- */
  //YYYY-MM-DD 반환환
  function getTodayDate() {
    const today = new Date();

    // 연도, 월, 일 추출
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    // 'YYYYMMDD' 형식으로 반환
    return parseInt(`${year}${month}${day}`);
  }
  /* --------------------------------------------------------------- */
  // const filteredEvents = diary.filter((event) => event.date === selectedDate);

  // 특정 날짜를 클릭할 시시
  const handleDateClick = (info) => {
    const clickDate = parseInt(info.dateStr.replace(/-/g, ""));
    const today = getTodayDate();

    if (clickDate > today) {// 오늘 이후 날짜를 클릴 할 경우
      alert('오늘 이후의 일기 작성은 미래의 자신만 가능합니다!');
      return;
    }

    const clickEvent = diary.find((item) => item.selectedDate == info.dateStr);

    // console.log("클릭된 이벤트 ID:", clickEvent);
    setDiaryobj(clickEvent); // 객체 담기
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
    //이미지 드랍 했을 때, 
    console.log(info.draggedEl.getAttribute('data-id')); // 날짜 문자열 반환
    console.log(info.dateStr);
    const dropDateData = diary.filter((event) => event.date === info.dateStr);
    let copyEvents = diary;
    console.log('복사한 배열', copyEvents)
    // const copyEventsList = events.filter((event) =>event.date === info.dateStr);
    // 일기가 작성되어 있는 경우
    if (dropDateData.length > 0) {
      // 삭제!
      copyEvents = diary.filter((event) => event.date !== info.dateStr);
      console.log(copyEvents);
      setDiary(copyEvents);
      console.log('제거완료', diary)

      // 이모지 추가
      dropDateData[0].emotion = info.draggedEl.getAttribute('data-id');
      console.log(dropDateData[0]);
      setDiary([...diary, ...dropDateData])
      console.log("이모지 추가", diary);
    } else {

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
        events={diary.map(item => ({
          id: item.id,
          title: item.title,
          start: item.selectedDate,        // 날짜
          contents: item.contents,  // 커스텀 데이터
          // emotion: item.emotion     // 커스텀 데이터
        }))}
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
          title="하루 일기"
          onClose={() => setIsModalOpen(false)}
        >
          <CalendarDiaryModal
            diaryObj={diaryObj}
            selectedDate={selectedDate}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      )}
    </div>
  )
}

export default CalendarDiary