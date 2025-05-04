import { useState, useEffect } from 'react';
import useDiaryStore from '../../../../../stores/useDiaryStore';
import axios from 'axios';

const CalendarDiaryModal = ({ diaryObj, selectedDate, setIsModalOpen }) => {
  // 제목 & 내용
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const {} = useDiaryStore();

  useEffect(() => {
    if (diaryObj) {
      setTitle(diaryObj.title);
      setContent(diaryObj.contents);
    } else {
      setTitle('');
      setContent('');
    }
    console.log(diaryObj);
  }, [diaryObj]);

    /* 새 일기 작성 */
    const createDiray = () => {
        if (title.trim() === '') return alert("제목을 입력해주세요.");
        if (content.trim() == '') return alert("내용을 입력해주세요.");
        const createDiaryObj = {
            selectedDate: selectedDate,
            title: title,
            contents: content,
        }
        const addDiaryEntry = async (newEntry) => {
            try {
                const response = await axios.post('http://localhost:3000/diary', newEntry);
                console.log('일기 추가 성공:', response.data);
                setIsModalOpen(false);
                // 추가 로직 (예: 상태 업데이트 등)
            } catch (error) {
                console.error('일기 추가 실패:', error);
            }
        };

        addDiaryEntry(createDiaryObj);
    }
    /* 일기 수정 */
    const editDiary = () => {
        axios.put(`http://localhost:3000/diary/${diaryObj.id}`, {
            id: diaryObj.id,
            selectedDate: diaryObj.selectedDate,
            title:title,
            contents: content,
        })
            .then(response => {
                console.log('수정 성공:', response.data);
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error('수정 실패:', error);
            });
    }

  // console.log('내용',content);
  // console.log('제목',title);
  return (
    <div>
      <div className="diaryModalTopArea">
        <p className="seletedDate">{selectedDate}</p>
        <p>
          <span className="diaryModalTitle">제목:</span>
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
