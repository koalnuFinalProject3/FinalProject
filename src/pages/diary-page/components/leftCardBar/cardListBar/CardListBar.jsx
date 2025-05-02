import { useState } from 'react';
import { motion } from 'motion/react';
import styles from './CardListBar.module.css';
import CardForm from '../cardForm/CardForm';
import CardBanner from '../cardBanner/CardBanner';
import DiaryFilter from '../diaryFilter/DiaryFilter';
import { useEmotionsAndDiaries } from '../../../../../hooks/useEmotionsAndDiaries';

const CardListBar = ({ handleClickCard }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');

  // 커스텀 훅으로 데이터 가져오기
  const { emotions, diaries, loading } = useEmotionsAndDiaries();

  const handleClickClose = () => {
    setIsOpen((prev) => !prev);
  };

  const handleEmotionChange = (e) => {
    setSelectedEmotion(e.target.value);
  };

  const handleOrderChange = (e) => {
    setSelectedOrder(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때
  }

  return (
    <motion.div
      className={styles.container}
      animate={{ width: isOpen ? '' : '50px' }}
      transition={{ duration: 0.6 }}
      style={{ overflow: 'hidden' }}
    >
      <CardBanner handleClickClose={handleClickClose} isOpen={isOpen} />
      {isOpen && (
        <>
          <div className={styles.diaryFilterContainer}>
            <DiaryFilter
              type="emotion"
              handleChange={handleEmotionChange}
              selected={selectedEmotion}
            />
            <DiaryFilter
              type="order"
              handleChange={handleOrderChange}
              selected={selectedOrder}
            />
          </div>
          <div className={styles.innerContainer}>
            {emotions.map((emotion) => {
              const relatedDiary = diaries.find(
                (diary) => diary.selectedDate === emotion.selectedDate
              );
              return (
                <CardForm
                  key={emotion.id}
                  date={emotion.selectedDate}
                  emotion={emotion.emotion}
                  diaryContent={relatedDiary ? relatedDiary.title : '내용 없음'} // 다이어리 내용도 같이 넘기기
                  onClick={handleClickCard}
                />
              );
            })}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default CardListBar;
