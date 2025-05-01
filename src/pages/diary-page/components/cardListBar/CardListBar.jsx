import { useState } from 'react';
import { motion } from 'motion/react';
import styles from './CardListBar.module.css';
import CardForm from '../cardForm/CardForm';
import CardBanner from '../cardBanner/CardBanner';

const CardListBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClickClose = () => {
    setIsOpen((prev) => !prev);
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
          <h1>다이어리 필터</h1>
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
