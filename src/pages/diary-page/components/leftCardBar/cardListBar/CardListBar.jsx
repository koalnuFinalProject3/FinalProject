import { useState } from 'react';
import { motion } from 'motion/react';
import styles from './CardListBar.module.css';
import CardForm from '../cardForm/CardForm';
import CardBanner from '../cardBanner/CardBanner';
import DiaryFilter from '../diaryFilter/DiaryFilter';

const CardListBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');

  const handleClickClose = () => {
    setIsOpen((prev) => !prev);
  };

  const handleEmotionChange = (e) => {
    setSelectedEmotion(e.target.value);
  };

  const handleOrderChange = (e) => {
    setSelectedOrder(e.target.value);
  };

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
            {[...Array(13)].map((_, i) => (
              <CardForm key={i} />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default CardListBar;
