import React from 'react';
import styles from './CardDefault.module.css';
import { AnimatePresence, motion } from 'motion/react';
import depressedChar from '../../../../../assets/images/depressedChar.png';
import happyChar from '../../../../../assets/images/happyChar.png';
import joyChar from '../../../../../assets/images/joyChar.png';
import sadChar from '../../../../../assets/images/sadChar.png';
import sosoChar from '../../../../../assets/images/sosoChar.png';
const CardDefault = () => {
  const emojis = [depressedChar, happyChar, joyChar, sadChar, sosoChar];

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
          {[...emojis, ...emojis, ...emojis].map((emoji, i) => (
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
