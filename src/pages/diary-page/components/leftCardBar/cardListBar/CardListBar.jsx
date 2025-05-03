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

  if (loading) return <div>Loading...</div>;

  // 🔽 감정 필터 적용
  const filteredEmotions = selectedEmotion
    ? emotions.filter(
        (emotion) => Number(emotion.emotion) === Number(selectedEmotion)
      )
    : emotions;

  // 🔽 정렬 필터 적용
  const sortedEmotions = [...filteredEmotions].sort((a, b) => {
    const dateA = new Date(a.selectedDate);
    const dateB = new Date(b.selectedDate);
    if (selectedOrder === 'oldest') return dateA - dateB;
    return dateB - dateA; // 기본: 최신순
  });

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
            {sortedEmotions.map((emotion) => {
              const relatedDiary = diaries.find(
                (diary) => diary.selectedDate === emotion.selectedDate
              );
              return (
                <CardForm
                  key={emotion.id}
                  date={emotion.selectedDate}
                  emotion={emotion.emotion}
                  diaryContent={relatedDiary ? relatedDiary.title : '내용 없음'}
                  onClick={() =>
                    handleClickCard({
                      id: relatedDiary ? relatedDiary.id : undefined,
                      date: emotion.selectedDate,
                      emotion: emotion.emotion,
                      diaryContent: relatedDiary
                        ? relatedDiary.contents
                        : '내용 없음',
                      diaryTitle: relatedDiary
                        ? relatedDiary.title
                        : '내용 없음',
                    })
                  }
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
