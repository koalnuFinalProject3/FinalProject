import React from 'react';
import styles from './CardForm.module.css';
import arrowIcon from '../../../../../assets/icons/caretCircleRight.svg';
import { emotionImages } from '../../../../../components/common/EmotionAssets';

const CardForm = ({ date, emotion, diaryContent, onClick }) => {
  return (
    <div className={styles.cardBox}>
      <div className={styles.cardAvatar}>
        <img
          src={emotionImages[emotion]}
          alt={`emotion-${emotion}`}
          className={styles.avatarImg}
        />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardDate}>{date}</div>
        <div className={styles.cardIndicator}>
          <span className={styles.text}>{diaryContent}</span>{' '}
          <img
            className={styles.arrow}
            src={arrowIcon}
            alt="arrow"
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CardForm;
