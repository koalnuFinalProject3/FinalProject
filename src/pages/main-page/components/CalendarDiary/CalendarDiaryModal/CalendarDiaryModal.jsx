import { useState, useEffect } from 'react';
import useDiaryStore from '../../../../../stores/useDiaryStore';
import axios from 'axios';
import { toast } from 'react-toastify';

// 감정 이모지
import sad from '../../../../../assets/images/sadChar.png';
import soso from '../../../../../assets/images/sosoChar.png';
import happy from '../../../../../assets/images/joyChar.png';
import joy from '../../../../../assets/images/happyChar.png';
import depressed from '../../../../../assets/images/depressedChar.png';
import { deleteDiary } from '../../../../../apis/diary';
import { deleteEmotion } from '../../../../../apis/emotion';

const CalendarDiaryModal = ({
  diaryObj,
  selectedDate,
  setIsModalOpen,
  setChange,
}) => {
  // 제목 & 내용
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [emoImg, setEmoImg] = useState(null);

  const { emotion, emotions } = useDiaryStore();

  const handleDelete = async () => {
    if (!diaryObj || !diaryObj.id) {
      toast.warn('삭제할 일기가 없습니다.');
      return;
    }

    try {
      // 일기 삭제
      await deleteDiary(diaryObj.id);

      // 감정 삭제: selectedDate를 기준으로 해당 감정 찾기
      const emotionToDelete = emotions.find(
        (e) => e.selectedDate === diaryObj.selectedDate
      );
      if (emotionToDelete) {
        await deleteEmotion(emotionToDelete.id);
      }

      toast.success('일기와 감정이 삭제되었습니다!');
      setIsModalOpen(false);
      setChange((prev) => !prev); // 데이터 새로고침 트리거
    } catch (error) {
      console.error('삭제 중 오류:', error);
      toast.error('삭제 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    setEmoImg(null);
    if (diaryObj) {
      setTitle(diaryObj.title);
      setContent(diaryObj.contents);
      switch (parseInt(emotion)) {
        case 1:
          setEmoImg(sad);
          break;
        case 2:
          setEmoImg(depressed);
          break;
        case 3:
          setEmoImg(soso);
          break;
        case 4:
          setEmoImg(joy);
          break;
        case 5:
          setEmoImg(happy);
          break;
        default:
          setEmoImg(null);
      }
    } else {
      setTitle('');
      setContent('');
      setEmoImg(null);
    }
    console.log(diaryObj);
  }, [diaryObj]);
  console.log('nameEmo', emoImg);

  /* 새 일기 작성 */
  const createDiray = () => {
    if (title.trim() === '') return toast.error('제목을 입력해주세요.');
    if (content.trim() == '') return toast.error('내용을 입력해주세요.');
    const createDiaryObj = {
      selectedDate: selectedDate,
      title: title,
      contents: content,
    };
    const addDiaryEntry = async (newEntry) => {
      try {
        const response = await axios.post(
          'http://localhost:3000/diary',
          newEntry
        );
        console.log('일기 추가 성공:', response.data);
        setIsModalOpen(false);
        // 추가 로직 (예: 상태 업데이트 등)
      } catch (error) {
        console.error('일기 추가 실패:', error);
      }
    };

    addDiaryEntry(createDiaryObj);
  };
  /* 일기 수정 */
  const editDiary = () => {
    axios
      .put(`http://localhost:3000/diary/${diaryObj.id}`, {
        id: diaryObj.id,
        selectedDate: diaryObj.selectedDate,
        title: title,
        contents: content,
      })
      .then((response) => {
        console.log('수정 성공:', response.data);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('수정 실패:', error);
      });
  };

  // console.log('내용',content);
  // console.log('제목',title);
  return (
    <div className="modalDiaryArea">
      <div className="emotionDiaryArea">
        오늘의 감정:{emoImg && <img src={emoImg} />}
      </div>
      <div className="diaryModalTopArea">
        <div>
          <p className="seletedDate">{selectedDate}</p>
          <p>
            <span className="diaryModalTitle">제목</span>
            {diaryObj ? (
              <input
                className="diaryModalTitleInput"
                placeholder="제목을 작성해주세요."
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            ) : (
              <input
                className="diaryModalTitleInput"
                placeholder="제목을 작성해주세요."
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            )}
          </p>
        </div>
        <div onClick={handleDelete} className="deleteBtn">
          <svg
            width="20"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 4V15.8C3 16.9201 3 17.4798 3.21799 17.9076C3.40973 18.2839 3.71547 18.5905 4.0918 18.7822C4.5192 19 5.07899 19 6.19691 19H11.8031C12.921 19 13.48 19 13.9074 18.7822C14.2837 18.5905 14.5905 18.2839 14.7822 17.9076C15 17.4802 15 16.921 15 15.8031V4M3 4H5M3 4H1M5 4H13M5 4C5 3.06812 5 2.60241 5.15224 2.23486C5.35523 1.74481 5.74432 1.35523 6.23438 1.15224C6.60192 1 7.06812 1 8 1H10C10.9319 1 11.3978 1 11.7654 1.15224C12.2554 1.35523 12.6447 1.74481 12.8477 2.23486C12.9999 2.6024 13 3.06812 13 4M13 4H15M15 4H17"
              stroke="#FCE4EC"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="diaryModalContextArea">
        {diaryObj ? (
          <textarea
            className="diaryModalContext"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        ) : (
          <textarea
            className="diaryModalContext"
            placeholder="내용을 작성해주세요."
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        )}
      </div>
      <div className="diaryModalBtnArea">
        {diaryObj ? (
          <button onClick={editDiary}>수정하기</button>
        ) : (
          <button onClick={createDiray}>기록 저장하기</button>
        )}
      </div>
    </div>
  );
};

export default CalendarDiaryModal;
