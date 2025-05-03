import { useState, useEffect } from 'react';
import styles from './CardDetail.module.css';
import closeIcon from '../../../../../assets/icons/closeMd.svg';
import { emotionImages } from '../../../../../components/common/EmotionAssets';
import { updateDiary } from '../../../../../apis/diary';

const CardDetail = ({ selectedCard, handleClickBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(selectedCard.diaryContent);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleSave = async () => {
    try {
      // 서버에 데이터 수정 요청
      await updateDiary(selectedCard.id, {
        selectedDate: selectedCard.date,
        contents: editedContent,
        title: selectedCard.diaryTitle,
        emotion: selectedCard.emotion,
      });

      // 수정된 내용을 로컬 상태에 반영
      setEditedContent(editedContent);
      alert('일기 수정 완료!');

      // selectedCard 상태 갱신 (UI 즉시 반영)
      handleClickBack({
        ...selectedCard,
        diaryContent: editedContent,
      });
    } catch (error) {
      console.error('에러 발생:', error);
      alert('수정에 실패했습니다.');
    }
  };

  const handleback = () => {
    // 수정 취소
    setIsEditing(false);
    setEditedContent(selectedCard.diaryContent);
  };
  useEffect(() => {
    // selectedCard가 변경될 때마다 editedContent 상태 갱신
    setEditedContent(selectedCard.diaryContent);
  }, [selectedCard]);
  return (
    <div className={styles.cardContainer}>
      <img
        src={closeIcon}
        alt="closeIcon"
        className={styles.icon}
        onClick={handleClickBack}
      />

      <div className={styles.header}>
        <div className={styles.avatar}>
          <img
            src={emotionImages[selectedCard.emotion]}
            alt={`emotion-${selectedCard.emotion}`}
            className={styles.avatarImg}
          />
        </div>
        <div>
          <span className={styles.date}>{selectedCard.date}</span>
          <div className={styles.title}>{selectedCard.diaryTitle}</div>
        </div>
      </div>

      <div className={styles.body}>
        {isEditing ? (
          <>
            <textarea
              value={editedContent}
              onChange={handleChange}
              className={styles.textarea}
            />
            <div className={styles.buttonContainer}>
              <button className={styles.editButton} onClick={handleSave}>
                저장
              </button>
              <button className={styles.backButton} onClick={handleback}>
                취소하기
              </button>
            </div>
          </>
        ) : (
          <>
            {selectedCard.diaryTitle !== '내용 없음' && (
              <button className={styles.editButton} onClick={handleEdit}>
                수정하기
              </button>
            )}
            <p className={styles.content}>{selectedCard.diaryContent}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CardDetail;
