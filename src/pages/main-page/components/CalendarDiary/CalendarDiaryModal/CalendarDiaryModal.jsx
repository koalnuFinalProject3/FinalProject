import { useState, useEffect } from 'react';
import useDiaryStore from '../../../../../stores/useDiaryStore';
import axios from 'axios';
// 감정 이모지
import sad from '../../../../../assets/images/sadChar.png';
import soso from '../../../../../assets/images/sosoChar.png';
import happy from '../../../../../assets/images/joyChar.png';
import joy from '../../../../../assets/images/happyChar.png';
import depressed from '../../../../../assets/images/depressedChar.png';

const CalendarDiaryModal = ({ diaryObj, selectedDate, setIsModalOpen }) => {

    // 제목 & 내용
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [emoImg, setEmoImg] = useState(null);

    const { emotion } = useDiaryStore();
    
    useEffect(() => {
        setEmoImg(null);
        if (diaryObj) {
            setTitle(diaryObj.title);
            setContent(diaryObj.contents);
            switch (parseInt(emotion)) {
                case 1: setEmoImg(sad); break;
                case 2: setEmoImg(depressed);  break;
                case 3: setEmoImg(soso); break;
                case 4: setEmoImg(joy); break;
                case 5: setEmoImg(happy); break;
                default: setEmoImg(null);
            }
        } else {
            setTitle('');
            setContent('');
            setEmoImg(null);
        }
        console.log(diaryObj)
    }, [diaryObj]);
    console.log('nameEmo', emoImg)

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
            title: title,
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
        <div className='modalDiaryArea'>
            <div className='emotionDiaryArea'>오늘의 감정:{emoImg&& <img src={emoImg}/>}</div>
            <div className='diaryModalTopArea'>
                <p className='seletedDate'>{selectedDate}</p>
                <p>
                    <span className='diaryModalTitle'>제목:</span>
                    {diaryObj ?
                        <input
                            className='diaryModalTitleInput'
                            placeholder='제목을 작성해주세요.'
                            onChange={(e) => { setTitle(e.target.value) }}
                            value={title}
                        />
                        : (
                            <input
                                className='diaryModalTitleInput'
                                placeholder='제목을 작성해주세요.'
                                onChange={(e) => { setTitle(e.target.value) }}
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
