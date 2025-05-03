import React from 'react';
import styles from './CardDefault.module.css';
import { AnimatePresence, motion } from 'motion/react';
import { emotionImageArray } from '../../../../../components/common/EmotionAssets';
const CardDefault = () => {
  return (
    <div className={styles.container}>
      <h1>느낌 한 조각</h1>
      <h2>"오늘, 나만의 이야기를 확인해 보세요"</h2>
      {/* 애니메이션 넣을거임 */}
      <div className={styles.card}>
        <motion.div
          className={styles.track}
          animate={{ x: ['0%', '-100%'] }}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
        >
          {[
            ...emotionImageArray,
            ...emotionImageArray,
            ...emotionImageArray,
          ].map((emoji, i) => (
            <img
              key={i}
              src={emoji}
              alt={`emoji-${i}`}
              className={styles.emoji}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CardDefault;
