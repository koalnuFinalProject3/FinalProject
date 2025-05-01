import React from 'react';
import styles from './CardForm.module.css';
import arrowIcon from '../../../../../assets/icons/caretCircleRight.svg';

const CardForm = ({ onClick }) => {
  return (
    <div className={styles.cardBox}>
      <div className={styles.cardAvatar}>여기에 감정이모지</div>
      <div className={styles.cardContent}>
        <div className={styles.cardDate}>2023. 04. 29</div>
        <div className={styles.cardIndicator}>
          <span className={styles.text}>여기는 내용을 적는 부분</span>

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
