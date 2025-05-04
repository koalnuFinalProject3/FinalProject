import { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import Modal from '../../../../components/common/Modal';
import './DiaryModal.style.css';
import CalendarDiaryModal from './CalendarDiaryModal/CalendarDiaryModal';
import styles from './CalendarDiary.module.css';
import axios from 'axios';
import useDiaryStore from '../../../../stores/useDiaryStore';

import { toast } from 'react-toastify';

// 감정 이모지
import sad from '../../../../assets/images/sadChar.png';
import soso from '../../../../assets/images/sosoChar.png';
import happy from '../../../../assets/images/joyChar.png';
import joy from '../../../../assets/images/happyChar.png';
import depressed from '../../../../assets/images/depressedChar.png';

import question from '../../../../assets/icons/question.svg';

const CalendarDiary = ({ setCalendarType }) => {
  //일기
  const { diary, setDiary, emotions, setEmotions, setEmotion } =
    useDiaryStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [change, setChange] = useState(false);
  const [diaryObj, setDiaryobj] = useState({});

  // 두 번 실행을 막는 기능!
  const isHandlingDrop = useRef(false);
  /* ------------------------------------------------------------ */
  // useEffect(() => {
  //   resetEmotions();
  //   const fetchData = async () => {
  //     const diaryRes = await axios.get('http://localhost:3000/diary');
  //     const emotionRes = await axios.get('http://localhost:3000/emotion');
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
  //로컬: http://localhost:3000/diary
  // git: https://my-json-server.typicode.com/koalnuFinalProject3/FinalProject/diary
  useEffect(() => {
    setEmotion(0);
    Promise.all([
      axios.get('http://localhost:3000/diary'),
      axios.get('http://localhost:3000/emotion'),
    ])
      .then(([diaryRes, emotionRes]) => {
        setDiary(diaryRes.data);
        setEmotions(emotionRes.data);
        // console.log(diary);
        console.log('감정', emotions);
      })
      .catch((error) => {
        console.error('데이터 가져오기 실패:', error);
      });
  }, [isModalOpen, change]);

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

    if (clickDate > today) {
      // 오늘 이후 날짜를 클릴 할 경우
      toast.warn('오늘 이후의 일기 작성은 미래의 자신만 가능합니다!');
      return;
    }

    const clickEvent = diary.find((item) => item.selectedDate == info.dateStr);

    const emoCode = emotions.find((item) => item.selectedDate === info.dateStr);
    if (emoCode) setEmotion(emoCode.emotion);
    // console.log('클릭된 이벤트 ID:', clickEvent);
    setDiaryobj(clickEvent); // 객체 담기
    setSelectedDate(info.dateStr);
    setIsModalOpen(true);
  };

  /* ---------------------------------------------------------------------------- */
  // 감정들 드래그앤 드랍 기능
  useEffect(() => {
    const draggableEl = document.getElementById('external-events');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.emotionStick',
        eventData: function (eventEl) {
          console.log('드래그해요!', eventEl.dataset.id);
          return {
            emotion: eventEl.dataset.id,
            // image: eventEl.src,
          };
        },
      });
    }
  }, []);

  //감정 관련 axios
  //감정 수정
  const updateEmotion = async (emotionMatch, emotionId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/emotion/${emotionMatch.id}`,
        {
          id: emotionMatch.id,
          emotion: parseInt(emotionId),
          selectedDate: emotionMatch.selectedDate,
        }
      );
      console.log('수정 성공:', response.data);
      toast.success('수정 성공');
      setChange(!change);
    } catch (error) {
      console.error('수정 실패:', error);
      toast.error('수정 실패');
    }
  };

  // 감정 생성
  const createEmotion = async (emotionId, date) => {
    try {
      const response = await axios.post('http://localhost:3000/emotion', {
        emotion: parseInt(emotionId),
        selectedDate: date,
      });
      console.log('생성 성공:', response.data);
      setChange(!change);
    } catch (error) {
      console.error('생성 실패:', error);
    }
  };

  // 드랍시 발생 이벤트!
  const handleDrop = async (info) => {
    if (isHandlingDrop.current) {
      console.log('중복 방지');
      return;
    }
    isHandlingDrop.current = true;

    const clickDate = parseInt(info.dateStr.replace(/-/g, ''));
    const today = getTodayDate();
    if (clickDate > today) {
      toast.warn('미래의 감정표현은 할 수 없어요!');
      isHandlingDrop.current = false;
      setChange((prev) => !prev);
      return;
    }
    //해당 날짜에 다이어리 객체가 있는 가?
    console.log(info.dateStr);
    const beDiary = diary.find((item) => item.selectedDate === info.dateStr);
    console.log('객체가 있나요?', beDiary);
    if (!beDiary) {
      toast.warn('먼저 일기를 작성한 후에 감정 스티커를 붙일 수 있습니다.');
      isHandlingDrop.current = false;
      setChange((prev) => !prev);
      return;
    }

    console.log('날짜에 드래그 했어요!');
    const emotionId = info.draggedEl.dataset.id; // 드래그한 emotion 코드
    // console.log('emotionId',emotionId);
    const droppedDate = info.dateStr; // 드롭한 해당 날짜
    const emotionMatch = emotions.find(
      (item) => item.selectedDate === droppedDate
    ); // 드롭한 날짜와 동일한 이모션 객체 불러오기
    console.log('emotionMatch', emotionMatch);

    try {
      if (emotionMatch) {
        // 수정시
        await updateEmotion(emotionMatch, emotionId);
      } else {
        // 새로 이모지 붙일 시
        await createEmotion(emotionId, droppedDate);
      }

      // await fetchEmotions();
    } catch (error) {
      console.error('드롭 처리 중 오류 발생:', error);
    } finally {
      setTimeout(() => {
        isHandlingDrop.current = false;
        console.log('드롭 처리 완료 후 잠금 해제');
      }, 300);
      setChange((prev) => !prev);
    }
  };

  /* 날짜에 보여지는 것 */
  function renderEventContent(eventInfo) {
    //id 불러오기(일기)
    const eventId = eventInfo.event._def.publicId;

    const matchedItems = diary.filter((item) => item.id === eventId);
    console.log('matchedItems', matchedItems);
    console.log('eventInfo', eventInfo.event.startStr);
    //날짜 일치하는 이모지 불러오기
    const emotion = emotions.find(
      (item) => item.selectedDate === matchedItems[0]?.selectedDate
    );
    // console.log('emo', emotion ? emotion.emotion : 0);

    console.log('rendering emotion,', emotion);

    // 이미지 경로 지정
    let emotionImg = null;
    let colorEmotion = '';
    switch (emotion?.emotion) {
      case 1:
        emotionImg = sad;
        colorEmotion = 'sadDiary';
        break;
      case 2:
        emotionImg = depressed;
        colorEmotion = 'depressedDiary';
        break;
      case 3:
        emotionImg = soso;
        colorEmotion = 'sosoDiary';
        break;
      case 4:
        emotionImg = joy;
        colorEmotion = 'joyDiary';
        break;
      case 5:
        emotionImg = happy;
        colorEmotion = 'happyDiary';
        break;
      default:
        emotionImg = null;
        colorEmotion = 'noneDiary';
    }

    return (
      <div className="barArea">
        {matchedItems.map((item, index) => (
          <>
            <div key={index} className={`${styles.diaryItem} ${colorEmotion}`}>
              {item.title}
              {emotion ? (
                // emotionImg ? (
                <img src={emotionImg} alt="emotion" />
              ) : (
                // ) : (
                //   <div></div>
                // )
                <div></div>
              )}
            </div>
          </>
        ))}
      </div>
    );
  }

  // <div>감정을 기록하세요!</div>
  // <div>감정 아이콘을 오늘 날짜로 끌어다 놓아보세요.</div>

  return (
    <div className="calendarArea">
      {/* 이모티콘 영역 */}
      <div id="external-events" className={styles.emotionArea}>
        <div className={styles.emotionQuestionArea}>
          감정 한 조각 표현하기
          <div className={styles.question}>
            <img src={question} alt="question" />
          </div>
        </div>
        <div className={styles.emotionSlide}>
          <img
            className={`${styles.emotionStick} emotionStick`}
            data-id="1"
            src={sad}
          />
          <img
            className={`${styles.emotionStick} emotionStick`}
            data-id="2"
            src={depressed}
          />
          <img
            className={`${styles.emotionStick} emotionStick`}
            data-id="3"
            src={soso}
          />
          <img
            className={`${styles.emotionStick} emotionStick`}
            data-id="4"
            src={joy}
          />
          <img
            className={`${styles.emotionStick} emotionStick`}
            data-id="5"
            src={happy}
          />
        </div>
      </div>

      <FullCalendar
        key={change} // 값 변경시 리랜더링
        plugins={[dayGridPlugin, interactionPlugin]}
        events={diary.map((item) => ({
          id: item.id,
          title: item.title,
          start: item.selectedDate,
          contents: item.contents,
          // emotion: item.emotion
        }))}
        eventContent={renderEventContent}
        dateClick={handleDateClick}
        eventClick={handleDateClick}
        droppable={true}
        drop={handleDrop}
        eventReceive={(info) => {
          const beDiary = diary.find(
            (item) => item.selectedDate === info.dateStr
          );
          if (beDiary) return;
          console.log('eventReceive 방지용', info);
          setChange((prev) => !prev);
        }}
        /* －－－－－－－－－－－－－－ */
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
            setChange={setChange}
          />
        </Modal>
      )}
    </div>
  );
};

export default CalendarDiary;
