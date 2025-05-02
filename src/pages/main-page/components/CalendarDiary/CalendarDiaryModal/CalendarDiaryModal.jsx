import { useState, useEffect } from 'react';

const CalendarDiaryModal = ({ filteredEvents, selectedDate }) => {
    // 제목 & 내용
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');


    useEffect(() => {
        if (filteredEvents.length > 0) {
            setTitle(filteredEvents[0].title);
            setContext(filteredEvents[0].context);
        } else {
            setTitle('');
            setContext('');
        }
    }, [filteredEvents]);

    // console.log('내용',context);
    // console.log('제목',title);
    return (
        <div>
            <div className='diaryModalTopArea'>
                <p className='seletedDate'>{selectedDate}</p>
                <p>
                    <span className='diaryModalTitle'>제목:</span>
                    {filteredEvents.length > 0 ?
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

            <div className='diaryModalContextArea'>
                {filteredEvents.length > 0 ?
                    (
                        <textarea
                            className='diaryModalContext'
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                        >
                        </textarea>
                    ) : (
                        <textarea
                            className='diaryModalContext'
                            placeholder='내용을 작성해주세요.'
                            onChange={(e) => setContext(e.target.value)}
                        ></textarea>
                    )}
            </div>
            <div className='diaryModalBtnArea'>
                {filteredEvents.length > 0 ? (
                    <button>수정하기</button>
                ) : (
                    <button >기록 저장하기</button>
                )}
            </div>
        </div>
    )
}

export default CalendarDiaryModal