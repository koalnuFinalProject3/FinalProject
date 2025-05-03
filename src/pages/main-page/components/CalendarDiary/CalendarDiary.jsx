import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import Modal from '../../../../components/common/Modal';
import './DiaryModal.style.css';
import CalendarDiaryModal from './CalendarDiaryModal/CalendarDiaryModal';
import styles from './CalendarDiary.module.css'
import axios from 'axios';
import useDiaryStore from '../../../../stores/useDiaryStore';
// 감정 이모지
import sad from '../../../../assets/images/sadChar.png';
import soso from '../../../../assets/images/sosoChar.png';
import happy from '../../../../assets/images/joyChar.png';
import joy from '../../../../assets/images/happyChar.png';
import depressed from '../../../../assets/images/depressedChar.png';

import question from '../../../../assets/icons/question.svg'


const CalendarDiary = ({ setCalendarType }) => {

  //일기
  const { diary, setDiary, emotions, setEmotions,resetEmotions } = useDiaryStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [change, setChange] = useState(false);
  const [diaryObj, setDiaryobj] = useState({});
  /* ------------------------------------------------------------ */
  // useEffect(() => {
  //   resetEmotions();
  //   const fetchData = async () => {
  //     const diaryRes = await axios.get('http://localhost:5000/diary');
  //     const emotionRes = await axios.get('http://localhost:5000/emotion');
  //     setDiary(diaryRes.data);
  //     setEmotions(emotionRes.data);
  //   };

  //   fetchData();
  // }, []);
  // useEffect(() => {
  //   fetchEmotions(); // 컴포넌트 마운트 시 항상 최신 상태
  // }, []);


  /* ------------------------------------------------------------------ */


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
        // console.log(diary);
        console.log('감정', emotions);
      })
      .catch(error => {
        console.error('데이터 가져오기 실패:', error);
      });
  }, [isModalOpen, change ]);

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
    const clickDate = parseInt(info.dateStr.replace(/-/g, ''));
    const today = getTodayDate();

    if (clickDate > today) {// 오늘 이후 날짜를 클릴 할 경우
      alert('오늘 이후의 일기 작성은 미래의 자신만 가능합니다!');
      return;
    }

    const clickEvent = diary.find((item) => item.selectedDate == info.dateStr);

    // console.log('클릭된 이벤트 ID:', clickEvent);
    setDiaryobj(clickEvent); // 객체 담기
    setSelectedDate(info.dateStr);
    setIsModalOpen(true);
  };

  /* ---------------------------------------------------------------------------- */

  useEffect(() => {
    const draggableEl = document.getElementById('external-events');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.emotionStick',
        eventData: function (eventEl) {
          // console.log('evnetEl',eventEl.dataset.id);
          return {
            emotion: eventEl.dataset.id,
            // image: eventEl.src,
          };
        }
      });
    }
  }, []);

  //감정 관련 axios
  //감정 수정 
  const updateEmotion = async (emotionMatch, emotionId) => {
    try {
      const response = await axios.put(`http://localhost:5000/emotion/${emotionMatch.id}`, {
        id: emotionMatch.id,
        emotion: parseInt(emotionId),
        selectedDate: emotionMatch.selectedDate,
      });
      console.log('수정 성공:', response.data);
      alert('수정 성공');
      setChange(!change);
    } catch (error) {
      console.error('수정 실패:', error);
      alert('수정 실패');
    }
  };

  // 감정 생성
  const createEmotion = async (emotionId, date) => {
    try {
      const response = await axios.post('http://localhost:5000/emotion', {
        emotion: parseInt(emotionId),
        selectedDate: date,
      });
      console.log('생성 성공:', response.data);
      setChange(!change);
    } catch (error) {
      console.error('생성 실패:', error);
    }
  };

  const fetchEmotions = async () => {
    const res = await axios.get('http://localhost:5000/emotion');
    setEmotions(res.data);
  };

  // 드랍시 발생 이벤트!
  const handleDrop = async (info) => {
    console.log("handleDrop")
    const emotionId = info.draggedEl.dataset.id;
    const droppedDate = info.dateStr;
    const emotionMatch = emotions.find(item => item.selectedDate === droppedDate);
    console.log(emotionMatch);

    try {
      if (emotionMatch) {
        await updateEmotion(emotionMatch, emotionId);
      } else {
        await createEmotion(emotionId, droppedDate);
      }

      await fetchEmotions();
    } catch (error) {
      console.error('드롭 처리 중 오류 발생:', error);
    }
  };

  /* 날짜에 보여지는 것 */
  function renderEventContent(eventInfo) {
    //id 불러오기(일기)
    const eventId = eventInfo.event._def.publicId;
    const matchedItems = diary.filter(item => item.id === eventId);
    //날짜 일치하는 이모지 불러오기
    const emotion = emotions.find(item => item.selectedDate === matchedItems[0].selectedDate);
    // console.log('emo', emotion ? emotion.emotion : 0);

    console.log("redering emotion,", emotion);


    // 이미지 경로 지정
    let emotionImg = null;
    let color = null;
    switch (emotion?.emotion) {
      case 1: emotionImg = sad; break;
      case 2: emotionImg = depressed; break;
      case 3: emotionImg = soso; break;
      case 4: emotionImg = joy; break;
      case 5: emotionImg = happy; break;
      default: emotionImg = null;
    }


    return (
      <div className='barArea'>
        {matchedItems.map((item, index) => (
          <>
            <div key={index} className={styles.diaryItem}>
              {item.title}
              {emotion ? (
                // emotionImg ? (
                <img src={emotionImg} alt="emotion" />
                // ) : (
                //   <div></div>
                // )
              ) : (
                <div></div>
              )}
            </div>
          </>
        ))}
      </div>
    );
  }


  return (
    <div className='calendarArea'>
      {/* 이모티콘 영역 */}
      <div id='external-events' className={styles.emotionArea}>
        <div className={styles.emotionQuestionArea}>
          감정 한 조각 표현하기 <img src={question} alt='question' />
        </div>
        <div className={styles.emotionSlide} >
          <img className={`${styles.emotionStick} emotionStick`} data-id='1' src={sad} />
          <img className={`${styles.emotionStick} emotionStick`} data-id='2' src={depressed} />
          <img className={`${styles.emotionStick} emotionStick`} data-id='3' src={soso} />
          <img className={`${styles.emotionStick} emotionStick`} data-id='4' src={joy} />
          <img className={`${styles.emotionStick} emotionStick`} data-id='5' src={happy} />
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
        eventContent={renderEventContent}
        dateClick={handleDateClick}
        droppable={true}
        drop={handleDrop}
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
        height={750}
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
          title='하루 일기'
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